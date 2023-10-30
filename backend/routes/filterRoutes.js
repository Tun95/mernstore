import express from "express";
import expressAsyncHandler from "express-async-handler";
import Filters from "../models/filters.js";

const filterRouter = express.Router();

//====================
// Create a new filter
//====================
filterRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    try {
      const filterData = req.body; // You should validate and sanitize input data
      const newFilter = new Filters(filterData);
      const createdFilter = await newFilter.save();
      res.status(201).json(createdFilter);
    } catch (error) {
      res.status(500).json({ message: "Error creating filter" });
    }
  })
);

//================
// Get all filters
//================
filterRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const filters = await Filters.find({});
      res.json(filters);
    } catch (error) {
      res.status(500).json({ message: "Error fetching filters" });
    }
  })
);

//=======================
// Update a filter by ID
//=======================
filterRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const filterId = req.params.id;
      const filterData = req.body; // You should validate and sanitize input data
      const updatedFilter = await Filters.findByIdAndUpdate(
        filterId,
        filterData,
        {
          new: true,
        }
      );
      if (updatedFilter) {
        res.json(updatedFilter);
      } else {
        res.status(404).json({ message: "Filter not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating filter" });
    }
  })
);

//====================
// Get a filter by ID
//====================
filterRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const filterId = req.params.id;
      const filter = await Filters.findById(filterId);
      if (filter) {
        res.json(filter);
      } else {
        res.status(404).json({ message: "Filter not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching filter" });
    }
  })
);

//======================
// Delete a filter by ID
//======================
filterRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const filterId = req.params.id;
      const deletedFilter = await Filters.findByIdAndDelete(filterId);
      if (deletedFilter) {
        res.json({ message: "Filter deleted" });
      } else {
        res.status(404).json({ message: "Filter not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting filter" });
    }
  })
);

export default filterRouter;
