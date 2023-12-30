import mongoose from "mongoose";

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    isChecked: { type: Boolean, default: false },

    range: {
      type: String,
    },
    numProduct: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("plan", planSchema);
export default Plan;
