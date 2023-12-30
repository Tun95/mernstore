import express from "express";
import expressAsyncHandler from "express-async-handler";
import Announcement from "../models/announcement.js";

const announcementRouter = express.Router();

//=========================
// Create a new announcement
//=========================
announcementRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const announcementData = req.body;
    const newAnnouncement = new Announcement(announcementData);

    try {
      const savedAnnouncement = await newAnnouncement.save();
      res.status(201).json(savedAnnouncement);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//=========================
// Get all announcements
//=========================
announcementRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const allAnnouncements = await Announcement.find({});
      res.status(200).json(allAnnouncements);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//=========================
// Get announcement by ID
//=========================
announcementRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const announcementId = req.params.id;

    try {
      const announcement = await Announcement.findById(announcementId);

      if (announcement) {
        res.status(200).json(announcement);
      } else {
        res.status(404).json({ message: "Announcement not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//=========================
// Update announcement by ID
//=========================
announcementRouter.put(
  "/:id/update",
  expressAsyncHandler(async (req, res) => {
    const announcementId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        updatedData,
        { new: true, runValidators: true }
      );

      if (updatedAnnouncement) {
        res.status(200).json(updatedAnnouncement);
      } else {
        res.status(404).json({ message: "Announcement not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//=========================
// Delete announcement by ID
//=========================
announcementRouter.delete(
  "/:id/delete",
  expressAsyncHandler(async (req, res) => {
    const announcementId = req.params.id;

    try {
      const deletedAnnouncement = await Announcement.findByIdAndDelete(
        announcementId
      );

      if (deletedAnnouncement) {
        res.status(200).json({ message: "Announcement deleted successfully" });
      } else {
        res.status(404).json({ message: "Announcement not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

export default announcementRouter;
