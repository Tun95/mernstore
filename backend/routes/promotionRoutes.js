import express from "express";
import expressAsyncHandler from "express-async-handler";
import http from "http";
import { Server } from "socket.io";
import Promotion from "../models/promotionModel.js";
import { isAuth, isAdmin } from "../utils.js";
import Product from "../models/productModels.js";

const promotionRouter = express.Router();

// Create a Socket.IO server
const server = http.createServer(); // Use 'http' module to create a server
const io = new Server(server);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");
  // Handle events related to countdown timer here
});

// Middleware to broadcast promotion updates to connected clients
promotionRouter.use((req, res, next) => {
  req.io = io;
  next();
});

//=======================
// Create a new promotion
//=======================
promotionRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionData = req.body;

      // Associate the user ID with the promotion
      promotionData.user = req.user._id;

      const promotion = new Promotion({
        ...promotionData,
        isChecked: false,
        _id: undefined,
      });
      const createdPromotion = await promotion.save();

      // Broadcast the created promotion to connected clients
      io.emit("promotionUpdate", { promotion: createdPromotion });

      res.status(201).send(createdPromotion);
    } catch (error) {
      console.error("Error creating promotion:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Fetch all promotions sorted by latest
//=======================
promotionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotions = await Promotion.find({})
        .populate("products")
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();

      res.send(promotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Fetch checked promotions
//=======================
promotionRouter.get(
  "/checked-promotions",
  expressAsyncHandler(async (req, res) => {
    try {
      const checkedPromotions = await Promotion.find({
        isChecked: true,
      }).populate({
        path: "products",
        options: {
          limit: 10, // Limit the number of populated products to 10
          sort: { createdAt: -1 }, // Sort by createdAt in descending order (latest first)
        },
      });
      res.send(checkedPromotions);
    } catch (error) {
      console.error("Error fetching checked promotions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Fetch promotion by ID
//=======================
promotionRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotion = await Promotion.findById(req.params.id);
      if (promotion) {
        res.send(promotion);
      } else {
        res.status(404).send({ message: "Promotion not found" });
      }
    } catch (error) {
      console.error("Error fetching promotion by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Fetch promotion by slug with product filtering
//=======================
const PAGE_SIZE = 12;
promotionRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    try {
      const { query } = req;
      const pageSize = query.pageSize || PAGE_SIZE;
      const page = query.page || 1;
      const sortOrder = query.order || "createdAt";

      const promotion = await Promotion.findOne({
        slug: req.params.slug,
      }).populate({
        path: "products",
        match: {
          // Add filters based on your product schema fields
          // Example filters; modify as per your product schema
          category: query.category || { $exists: true },
          subcategory: query.subcategory || { $exists: true },
          subitem: query.subitem || { $exists: true },
          // Add more filters as needed
        },
        options: {
          sort: sortOrder,
          skip: pageSize * (page - 1),
          limit: pageSize,
        },
      });

      if (promotion) {
        // Count the total number of products based on applied filters using aggregation
        const totalProducts = await Promotion.aggregate([
          { $match: { _id: promotion._id } },
          {
            $lookup: {
              from: "products", // Assuming your product collection is named "products"
              localField: "_id",
              foreignField: "promotion",
              as: "products",
            },
          },
          {
            $unwind: "$products",
          },
          {
            $match: {
              "products.category": query.category || { $exists: true },
              "products.subcategory": query.subcategory || { $exists: true },
              "products.subitem": query.subitem || { $exists: true },
              // Add more filters as needed
            },
          },
          { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        // Send both promotion and product data
        res.send({
          promotion,
          page,
          pages: Math.ceil(totalProducts[0]?.count / pageSize) || 1,
          countProducts: totalProducts[0]?.count || 0,
        });
      } else {
        res.status(404).send({ message: "Promotion not found" });
      }
    } catch (error) {
      console.error("Error fetching promotion by slug:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Update promotion
//=======================
promotionRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const promotion = await Promotion.findById(req.params.id);
      if (promotion) {
        // Update all fields from the request body
        Object.assign(promotion, req.body);

        const updatedPromotion = await promotion.save();

        // Broadcast the updated promotion to connected clients
        io.emit("promotionUpdate", { promotion: updatedPromotion });

        res.send(updatedPromotion);
      } else {
        res.status(404).send({ message: "Promotion not found" });
      }
    } catch (error) {
      console.error("Error updating promotion:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Set expiration date for a promotion
//=======================
promotionRouter.post(
  "/set-expiration/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const promotion = await Promotion.findById(req.params.id);
      if (promotion) {
        promotion.expirationDate =
          req.body.expirationDate || promotion.expirationDate;
        const updatedPromotion = await promotion.save();

        // Broadcast the updated promotion to connected clients
        io.emit("promotionUpdate", { promotion: updatedPromotion });

        res.send(updatedPromotion);
      } else {
        res.status(404).send({ message: "Promotion not found" });
      }
    } catch (error) {
      console.error("Error setting expiration date:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Delete promotion
//=======================
promotionRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionId = req.params.id;

      // Delete the promotion document from the database
      const result = await Promotion.deleteOne({ _id: promotionId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Promotion not found" });
      }

      // Broadcast the deletion to connected clients
      io.emit("promotionUpdate", { promotion: null });

      res.status(200).json({ message: "Promotion deleted successfully" });
    } catch (error) {
      console.error("Error deleting promotion:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default promotionRouter;
