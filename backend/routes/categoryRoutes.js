import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";

const categoryRoutes = express.Router();

//====================
// Create a new category
//====================
categoryRoutes.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    try {
      const categoryData = req.body;
      const newCategory = new Category(categoryData);
      const createdCategory = await newCategory.save();
      res.status(201).json(createdCategory);
    } catch (error) {
      res.status(500).json({ message: "Error creating category" });
    }
  })
);

//================
// Get all filters
//================
categoryRoutes.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  })
);

//=========================
//FETCH ALL ALPHA. CATEGORY
//=========================
categoryRoutes.get(
  "/alphabetic",
  expressAsyncHandler(async (req, res) => {
    const mysort = { category: 1 };
    try {
      const categories = await Category.find({}).sort(mysort).populate("user");
      res.send(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  })
);

//=======================
// Add items by ID
//=======================
categoryRoutes.patch(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { path, data } = req.body;

      // Find the category by ID
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Use a dynamic function to update the specific element based on the path
      const updateElement = (object, pathArray, newData) => {
        if (pathArray.length === 0) {
          object.push(...newData); // If the path is empty, add data to the current element
        } else {
          const [currentPath, ...remainingPath] = pathArray;
          const currentElement = object[currentPath];
          updateElement(currentElement, remainingPath, newData);
        }
      };

      const pathArray = path.split(".").map((item) => {
        if (!isNaN(item)) {
          return parseInt(item, 10);
        }
        return item;
      });

      updateElement(category, pathArray, data);

      // Save the updated category
      const updatedCategory = await category.save();

      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Error updating category" });
    }
  })
);

//===========================
// Update the entire category
//===========================
categoryRoutes.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const updatedCategoryData = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedCategoryData,
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating category", error);
      res.status(500).json({ message: "Error updating category" });
    }
  })
);

//====================
// Get a Category by ID
//====================
categoryRoutes.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  })
);

//======================
// Delete a Category by ID
//======================
categoryRoutes.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (deletedCategory) {
        res.json({ message: "Category deleted" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting category" });
    }
  })
);

export default categoryRoutes;
