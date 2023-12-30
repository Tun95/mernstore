import express from "express";
import expressAsyncHandler from "express-async-handler";
import Banner from "../models/banner.js";
import { isAuth, isAdmin } from "../utils.js";

const bannerRouter = express.Router();

//====================
// Create a new banner
//====================
bannerRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const { banners } = req.body;

      const newBanner = new Banner({
        banners,
      });

      // Set the user ID for the banner
      newBanner.banners[0].user = req.user._id;

      const savedBanner = await newBanner.save();

      res.status(201).json(savedBanner);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create banner", error: error.message });
    }
  })
);

//====================
// Get all banners (sorted by latest)
//====================
bannerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      // Fetch all banners from the database, sorted by the latest
      const banners = await Banner.find().sort({ createdAt: -1 });

      res.status(200).json(banners);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch banners", error: error.message });
    }
  })
);

//====================
// Get a specific banner by ID
//====================
bannerRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const bannerId = req.params.id;

      // Find the banner by ID in the database
      const banner = await Banner.findById(bannerId);

      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }

      res.status(200).json(banner);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch banner", error: error.message });
    }
  })
);

//====================
// Update a specific banner by ID
//====================
bannerRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        title,
        description,
        img,
        imgBackground,
        videoBackground,
        buttonText,
        buttonLink,
        color,
        pColor,
      } = req.body;
      const bannerId = req.params.id;

      // Find the banner by ID in the database
      const banner = await Banner.findById(bannerId);

      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }

      // Update the banner fields
      banner.banners[0].title = title;
      banner.banners[0].description = description;
      banner.banners[0].img = img;
      banner.banners[0].imgBackground = imgBackground;
      banner.banners[0].videoBackground = videoBackground;
      banner.banners[0].buttonText = buttonText;
      banner.banners[0].buttonLink = buttonLink;
      banner.banners[0].color = color;
      banner.banners[0].pColor = pColor;

      // Save the updated banner to the database
      const updatedBanner = await banner.save();

      res.status(200).json(updatedBanner);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update banner", error: error.message });
    }
  })
);

//====================
// Delete a specific banner by ID
//====================
bannerRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const bannerId = req.params.id;

      // Find the banner by ID in the database
      const banner = await Banner.findById(bannerId);

      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }

      // Check if the user making the request is the owner of the banner
      if (banner.banners[0].user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Delete the banner document from the database
      const result = await Banner.deleteOne({ _id: bannerId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Banner not found" });
      }

      res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete banner", error: error.message });
    }
  })
);

export default bannerRouter;
