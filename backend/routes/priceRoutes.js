import express from "express";
import expressAsyncHandler from "express-async-handler";
import Price from "../models/price.js";

const priceRoutes = express.Router();

// =========
// FETCH
// =========
priceRoutes.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const prices = await Price.find({});
      res.status(200).json(prices);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch prices", error: error.message });
    }
  })
);

// =========
// CREATE
// =========
priceRoutes.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { minValue, maxValue } = req.body;

      const newPrice = new Price({
        minValue,
        maxValue,
      });

      const savedPrice = await newPrice.save();

      res.status(201).json(savedPrice);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create price", error: error.message });
    }
  })
);

// =======
// UPDATE
// =======

priceRoutes.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const price = await Price.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        { new: true }
      );
      if (!price) {
        res.status(404).json({ message: "Price not found" });
        return;
      }
      res.json(price);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update price", error: error.message });
    }
  })
);

export default priceRoutes;
