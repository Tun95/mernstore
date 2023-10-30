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
  id: Number,
  icon: String,
  background: String,
  img: String,
  name: String,
  description: String,
  subCategories: [subCategorySchema],
});

const colorFilterSchema = new mongoose.Schema({
  name: String,
  hexCode: String,
});

const filterModel = new mongoose.Schema({
  categories: [categorySchema],
  prices: {
    minPrice: Number,
    maxPrice: Number,
  },
  colors: [colorFilterSchema],
});

const Filters = mongoose.model("Filters", filterModel);
export default Filters;
