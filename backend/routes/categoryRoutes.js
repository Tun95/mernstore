import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";

const categoryRouter = express.Router();

//========================
// Create a new category
//========================
categoryRouter.post(
  "/create-category",
  expressAsyncHandler(async (req, res) => {
    const { icon, background, img, name, description } = req.body;
    const newCategory = new Category({
      categories: [
        { icon, background, img, name, description, subCategories: [] },
      ],
    });
    const createdCategory = await newCategory.save();
    res.status(201).json(createdCategory);
  })
);

//======================================
// Create a new subcategory under a chosen category
//======================================
categoryRouter.post(
  "/:categoryId/create-subcategory",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, img } = req.body;

    const category = await Category.findById(categoryId);

    if (category) {
      const newSubCategory = {
        name,
        img,
        subItems: [],
      };

      category.categories[0].subCategories.push(newSubCategory);
      const updatedCategory = await category.save();
      res.status(201).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//======================================
// Create a new subitem under a chosen category and subcategory
//======================================
categoryRouter.post(
  "/:categoryId/:subCategoryId/create-subitem",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const { name } = req.body;

    const category = await Category.findById(categoryId);

    if (category) {
      const subCategory = category.categories[0].subCategories.find(
        (subCat) => subCat._id.toString() === subCategoryId
      );

      if (subCategory) {
        const newSubItem = { name };
        subCategory.subItems.push(newSubItem);

        const updatedCategory = await category.save();
        res.status(201).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//====================
// Update a category
//====================
categoryRouter.put(
  "/update-category/:categoryId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const { icon, background, img, name, description } = req.body;

    const category = await Category.findById(categoryId);

    if (category) {
      category.categories[0].icon = icon;
      category.categories[0].background = background;
      category.categories[0].img = img;
      category.categories[0].name = name;
      category.categories[0].description = description;

      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//======================================
// Update a subcategory under a chosen category
//======================================
categoryRouter.put(
  "/:categoryId/update-subcategory/:subCategoryId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const { name, img } = req.body;

    const category = await Category.findById(categoryId);

    if (category) {
      const subCategory = category.categories[0].subCategories.find(
        (subCat) => subCat._id.toString() === subCategoryId
      );

      if (subCategory) {
        subCategory.name = name;
        subCategory.img = img;

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//======================================
// Update a subitem under a chosen category and subcategory
//======================================
categoryRouter.put(
  "/:categoryId/:subCategoryId/:subItemId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const subItemId = req.params.subItemId;
    const { name } = req.body;

    const category = await Category.findById(categoryId);

    if (category) {
      const subCategory = category.categories[0].subCategories.find(
        (subCat) => subCat._id.toString() === subCategoryId
      );

      if (subCategory) {
        const subItem = subCategory.subItems.find(
          (item) => item._id.toString() === subItemId
        );

        if (subItem) {
          subItem.name = name;
          const updatedCategory = await category.save();
          res.status(200).json(updatedCategory);
        } else {
          res.status(404).json({ message: "Subitem not found" });
        }
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//====================
// Delete a category
//====================
categoryRouter.delete(
  "/delete-category/:categoryId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//======================================
// Delete a subcategory under a chosen category
//======================================
categoryRouter.delete(
  "/:categoryId/delete-subcategory/:subCategoryId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;

    const category = await Category.findById(categoryId);

    if (category) {
      const subCategoryIndex = category.categories[0].subCategories.findIndex(
        (subCat) => subCat._id.toString() === subCategoryId
      );

      if (subCategoryIndex !== -1) {
        category.categories[0].subCategories.splice(subCategoryIndex, 1);

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//======================================
// Delete a subitem under a chosen category and subcategory
//======================================
categoryRouter.delete(
  "/:categoryId/:subCategoryId/:subItemId",
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const subItemId = req.params.subItemId;

    const category = await Category.findById(categoryId);

    if (category) {
      const subCategoryIndex = category.categories[0].subCategories.findIndex(
        (subCat) => subCat._id.toString() === subCategoryId
      );

      if (subCategoryIndex !== -1) {
        const subItemIndex = category.categories[0].subCategories[
          subCategoryIndex
        ].subItems.findIndex((item) => item._id.toString() === subItemId);

        if (subItemIndex !== -1) {
          category.categories[0].subCategories[
            subCategoryIndex
          ].subItems.splice(subItemIndex, 1);

          const updatedCategory = await category.save();
          res.status(200).json(updatedCategory);
        } else {
          res.status(404).json({ message: "Subitem not found" });
        }
      } else {
        res.status(404).json({ message: "Subcategory not found" });
      }
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

//=======================
// Fetch all categories
//=======================
categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const allCategories = await Category.find({});
      res.status(200).json(allCategories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

export default categoryRouter;
