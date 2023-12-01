import express from "express";
import expressAsyncHandler from "express-async-handler";
import Color from "../models/color.js";

const colorRouter = express.Router();

//=====================
// Create a new color
//=====================
colorRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { colors } = req.body;

      const newColor = new Color({
        colors,
      });

      const savedColor = await newColor.save();

      res.status(201).json(savedColor);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create color", error: error.message });
    }
  })
);

//=================
// Get all colors
//=================
colorRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      // Fetch all colors from the database
      const colors = await Color.find();

      res.status(200).json(colors);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch colors", error: error.message });
    }
  })
);

//========================
// Get a specific color
//========================
colorRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const colorId = req.params.id;

      // Find the color by ID in the database
      const color = await Color.findById(colorId);

      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }

      res.status(200).json(color);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch color", error: error.message });
    }
  })
);

//================================
// Update a specific color by ID
//================================
colorRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const { colorName, hexCode } = req.body;
      const colorId = req.params.id;

      // Find the color by ID in the database
      const color = await Color.findById(colorId);

      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }

      // Update the color fields
      color.colors[0].colorName = colorName;
      color.colors[0].hexCode = hexCode;

      // Save the updated color to the database
      const updatedColor = await color.save();

      res.status(200).json(updatedColor);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update color", error: error.message });
    }
  })
);

//================================
// Delete a specific color by ID
//================================
colorRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const colorId = req.params.id;

      // Delete the colorData document from the database
      const result = await Color.deleteOne({ _id: colorId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Color not found" });
      }

      res.status(200).json({ message: "Color deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete color", error: error.message });
    }
  })
);


export default colorRouter;
