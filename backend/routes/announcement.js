import express from "express";
import expressAsyncHandler from "express-async-handler";
import Announcement from "../models/announcement.js";

const announcementRouter = express.Router();

//==================
// Create a new slider
//==================
announcementRouter.post(
  "/sliders",
  expressAsyncHandler(async (req, res) => {
    const { _id, ...newSlide } = req.body; // Exclude _id from newSlide

    try {
      let announcement = await Announcement.findOne();

      if (!announcement) {
        // Create a new Announcement document if not found
        announcement = new Announcement({ sliders: [newSlide] });
      } else {
        // Add the new slide to the existing sliders
        announcement.sliders.push(newSlide);
      }

      const updatedAnnouncement = await announcement.save();

      res.status(201).json(updatedAnnouncement);
    } catch (error) {
      console.error("Fail to create new:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch all sliders
//==================
announcementRouter.get(
  "/sliders",
  expressAsyncHandler(async (req, res) => {
    const announcement = await Announcement.findOne();
    if (announcement) {
      res.json(announcement.sliders);
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  })
);

//==================
// Update slider by ID
//==================
announcementRouter.put(
  "/sliders/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedSlide = { ...req.body };

    const announcement = await Announcement.findOne();
    if (announcement) {
      const slideIndex = announcement.sliders.findIndex(
        (slide) => slide._id.toString() === id
      );
      if (slideIndex !== -1) {
        announcement.sliders[slideIndex] = { _id: id, ...updatedSlide };
        const updatedAnnouncement = await announcement.save();
        res.json(updatedAnnouncement.sliders[slideIndex]);
      } else {
        res.status(404).json({ message: "Slider not found" });
      }
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  })
);

//==================
// Delete slider by ID
//==================
announcementRouter.delete(
  "/sliders/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const announcement = await Announcement.findOne();
    if (announcement) {
      announcement.sliders = announcement.sliders.filter(
        (slide) => slide._id.toString() !== id
      );
      const updatedAnnouncement = await announcement.save();
      res.json({
        message: "Slider deleted",
        sliders: updatedAnnouncement.sliders,
      });
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  })
);

//==================
// Update only the fifthCard of the announcement
//==================
announcementRouter.put(
  "/update-fifth-card/:id",
  expressAsyncHandler(async (req, res) => {
    const { fifthCard } = req.body;
    const { id } = req.params;

    try {
      const announcement = await Announcement.findById(id);

      if (announcement) {
        announcement.fifthCard = fifthCard;

        const updatedAnnouncement = await announcement.save();
        res.json(updatedAnnouncement);
      } else {
        res.status(404).json({ message: "Announcement not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch all data
//==================
announcementRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    try {
      const announcement = await Announcement.findOne();
      if (announcement) {
        res.json(announcement);
      } else {
        res.status(404).json({ message: "Announcement not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=======================
// Fetch latest sliders
//=======================
announcementRouter.get(
  "/latest-sliders",
  expressAsyncHandler(async (req, res) => {
    try {
      const latestSliders = await Announcement.find({})
        .sort({ "sliders.createdAt": -1 }) // Sort sliders by timestamp in descending order
        .exec();

      if (latestSliders && latestSliders.sliders.length > 0) {
        res.json({ sliders: latestSliders.sliders });
      } else {
        res.status(404).json({ message: "Sliders not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default announcementRouter;
