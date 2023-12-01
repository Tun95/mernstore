import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    colors: [
      {
        colorName: {
          type: String,
        },
        hexCode: {
          type: String,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);
export default Color;
