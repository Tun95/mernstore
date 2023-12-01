import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";

const categoryRoutes = express.Router();

//==================
// CREATE category
//==================
categoryRoutes.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const { categories } = req.body;
    const newCategory = new Category({ categories });
    const createdCategory = await newCategory.save();
    res.status(201).json(createdCategory);
  })
);

//=========================
// FETCH all categories
//=========================
categoryRoutes.get(
  "/",
  expressAsyncHandler(async (_, res) => {
    try {
      const allCategories = await Category.find();
      res.json(allCategories);
    } catch (error) {
      console.error("Error fetching categories", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  })
);

//=========================
// FETCH category by ID
//=========================
categoryRoutes.get(
  "/fetch/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error("Error fetching category by ID", error);
      res.status(500).json({ message: "Error fetching category by ID" });
    }
  })
);

//=========================
//FETCH ALL ALPHA. CATEGORY
//=========================
categoryRoutes.get(
  "/alphabetic",
  expressAsyncHandler(async (req, res) => {
    const mysort = { "categories.name": 1 }; // Sorting by category name
    try {
      const categories = await Category.find({}).sort(mysort);
      res.send(categories);
    } catch (error) {
      console.error("Error fetching category", error); // Log the error for debugging
      res.status(500).json({ message: "Error fetching category" });
    }
  })
);

//=========================
// UPDATE all categories
//=========================
categoryRoutes.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    const { categories } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { categories },
      { new: true }
    );
    res.json(updatedCategory);
  })
);

//=========================
// UPDATE a specific subCategory
//=========================
categoryRoutes.put(
  "/updateSubCategory/:categoryId/:subCategoryId",
  expressAsyncHandler(async (req, res) => {
    const { name, img } = req.body;
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        {
          _id: req.params.categoryId,
          "categories.subCategories._id": req.params.subCategoryId,
        },
        {
          $set: {
            "categories.$.subCategories.$[subCategory].name": name,
            "categories.$.subCategories.$[subCategory].img": img,
          },
        },
        {
          arrayFilters: [{ "subCategory._id": req.params.subCategoryId }],
          new: true,
        }
      );
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating subCategory", error);
      res.status(500).json({ message: "Error updating subCategory" });
    }
  })
);

//=========================
// UPDATE a specific subItem
//=========================
categoryRoutes.put(
  "/updateSubItem/:categoryId/:subCategoryId/:subItemId",
  expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        {
          _id: req.params.categoryId,
          "categories.subCategories._id": req.params.subCategoryId,
          "categories.subCategories.subItems._id": req.params.subItemId,
        },
        {
          $set: {
            "categories.$[category].subCategories.$[subCategory].subItems.$[subItem].name":
              name,
          },
        },
        {
          arrayFilters: [
            { "category.subCategories": { $exists: true } },
            { "subCategory.subItems": { $exists: true } },
            { "subItem._id": req.params.subItemId },
          ],
          new: true,
        }
      );
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating subItem", error);
      res.status(500).json({ message: "Error updating subItem" });
    }
  })
);

//==================
// REMOVE category
//==================
categoryRoutes.delete(
  "/removeCategory/:categoryId",
  expressAsyncHandler(async (req, res) => {
    await Category.findByIdAndRemove(req.params.categoryId);
    res.json({ message: "Category removed" });
  })
);

//====================
// REMOVE subcategory
//====================
categoryRoutes.delete(
  "/removeSubCategory/:categoryId/:subCategoryId",
  expressAsyncHandler(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $pull: {
          "categories.subCategories": { _id: req.params.subCategoryId },
        },
      },
      { new: true }
    );
    res.json(updatedCategory);
  })
);

//=================
// REMOVE subitem
//=================
categoryRoutes.delete(
  "/removeSubItem/:categoryId/:subCategoryId/:subItemId",
  expressAsyncHandler(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $pull: {
          "categories.$[category].subCategories.$[subCategory].subItems": {
            _id: req.params.subItemId,
          },
        },
      },
      {
        arrayFilters: [
          { "category.subCategories": { $exists: true } },
          { "subCategory.subItems": { $exists: true } },
        ],
        new: true,
      }
    );
    res.json(updatedCategory);
  })
);

export default categoryRoutes;
