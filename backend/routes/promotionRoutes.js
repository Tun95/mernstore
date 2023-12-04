import express from "express";
import expressAsyncHandler from "express-async-handler";
import http from "http";
import { Server } from "socket.io";
import Promotion from "../models/promotionModel.js";

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
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionData = req.body;
      const promotion = new Promotion({ ...promotionData, isChecked: false });
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
// Fetch all promotions
//=======================
promotionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotions = await Promotion.find({});
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
      const checkedPromotions = await Promotion.find({ isChecked: true });
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
// Fetch promotion by slug
//=======================
promotionRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotion = await Promotion.findOne({
        slug: req.params.slug,
      });
      if (promotion) {
        res.send(promotion);
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
