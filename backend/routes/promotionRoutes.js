import express from "express";
import expressAsyncHandler from "express-async-handler";
import Promotion from "../models/promotionModel.js";

const promotionRouter = express.Router();

//========================================
// Route to create a new promotion
//========================================
promotionRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, image, description, countDownTimer, user } = req.body;
      const promotion = new Promotion({
        title,
        image,
        description,
        countDownTimer,
        user,
      });
      const createdPromotion = await promotion.save();
      res.status(201).json(createdPromotion);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Promotion creation failed", error: error.message });
    }
  })
);

//===============================
// Route to fetch all promotions
//===============================
promotionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotions = await Promotion.find({});
      res.json(promotions);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch promotions", error: error.message });
    }
  })
);

//========================================
// Route to update an existing promotion by ID
//========================================
promotionRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionId = req.params.id;
      const { title, image, description, countDownTimer, user } = req.body;
      const promotion = await Promotion.findById(promotionId);

      if (promotion) {
        promotion.title = title || promotion.title;
        promotion.image = image || promotion.image;
        promotion.description = description || promotion.description;
        promotion.countDownTimer = countDownTimer || promotion.countDownTimer;
        promotion.user = user || promotion.user;

        const updatedPromotion = await promotion.save();
        res.json(updatedPromotion);
      } else {
        res.status(404).json({ message: "Promotion not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Promotion update failed", error: error.message });
    }
  })
);

//========================================
// Route to fetch a single promotion by slug
//========================================
promotionRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    try {
      const slug = req.params.slug;
      const promotion = await Promotion.findOne({ slug });
      if (promotion) {
        res.json(promotion);
      } else {
        res.status(404).json({ message: "Promotion not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch promotion by slug",
        error: error.message,
      });
    }
  })
);

//========================================
// Route to fetch a single promotion by ID
//========================================
promotionRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionId = req.params.id;
      const promotion = await Promotion.findById(promotionId);
      if (promotion) {
        res.json(promotion);
      } else {
        res.status(404).json({ message: "Promotion not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch promotion by ID",
        error: error.message,
      });
    }
  })
);

//========================================
// Route to delete a promotion by ID
//========================================
promotionRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const promotionId = req.params.id;
      const promotion = await Promotion.findById(promotionId);
      if (promotion) {
        await promotion.remove();
        res.json({ message: "Promotion deleted" });
      } else {
        res.status(404).json({ message: "Promotion not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Promotion deletion failed", error: error.message });
    }
  })
);

export default promotionRouter;
