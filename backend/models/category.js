import mongoose from "mongoose";

const subItemSchema = new mongoose.Schema({
  name: String,
});

const subCategorySchema = new mongoose.Schema({
  name: String,
  img: String,
  subItems: [subItemSchema],
});

const categorySchema = new mongoose.Schema({
  icon: String,
  background: String,
  img: String,
  name: String,
  description: String,
  subCategories: [subCategorySchema],
});

const categoryModel = new mongoose.Schema(
  {
    categories: [categorySchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals to be included in toJSON output
    toObject: { virtuals: true }, // Enable virtuals to be included in toObject output
  }
);

const Category = mongoose.model("Category", categoryModel);
export default Category;
