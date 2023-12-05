import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    banners: [
      {
        title: {
          type: String,
          default: "Your Banner Title",
        },
        description: {
          type: String,
          default: "banner description",
        },
        img: {
          type: String,
          default: "banner image",
        },
        imgBackground: {
          type: String,
          default: "image background",
        },
        videoBackground: {
          type: String,
          default: "image background",
        },
        buttonText: {
          type: String,
        },
        color: {
          type: String,
        },
        pColor: {
          type: String,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
