import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    minValue: {
      type: String,
      default: 0,
    },
    maxValue: {
      type: String,
      default: 100,
    },
  },
  { timestamps: true }
);

const Price = mongoose.model("Price", priceSchema);
export default Price;
