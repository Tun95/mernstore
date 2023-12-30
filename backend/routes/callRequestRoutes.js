import express from "express";
import expressAsyncHandler from "express-async-handler";
import Calls from "../models/callRequestModel.js";
import { isAuth, isAdmin } from "../utils.js";

const callRouter = express.Router();

//==========================
// Create a new call record
//==========================
callRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, phone, convenientTimeFrom, convenientTimeTo } = req.body;
      const call = await Calls.create({
        name,
        phone,
        convenientTimeFrom,
        convenientTimeTo,
      });
      res.status(201).json(call);
    } catch (error) {
      res.status(500).json({ message: "Failed to create call record", error });
    }
  })
);

//==========================
// Fetch all call records
//==========================
callRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const calls = await Calls.find();
      res.json(calls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch call records", error });
    }
  })
);

//==========================
// Delete a call record by ID
//==========================
callRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const result = await Calls.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.json({ message: "Call record deleted successfully" });
      } else {
        res.status(404).json({ message: "Call record not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete call record", error });
      console.error("Error deleting a call:", error);
    }
  })
);

//==========================
// Delete all call records
//==========================
callRouter.get(
  "/delete",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const result = await Calls.deleteMany({});
      res.json({ message: "All call records deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete all call records", error });
      console.error("Error deleting all calls:", error);
    }
  })
);

export default callRouter;
