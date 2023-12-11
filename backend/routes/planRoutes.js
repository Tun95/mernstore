// ROUTES
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Plan from "../models/planModel.js";
import { isAuth, isAdmin } from "../utils.js";

const planRouter = express.Router();

//===================
// Create a new plan
//===================
planRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      // Extract plan data from the request body
      const planData = req.body;

      // Associate the user ID with the plan
      planData.user = req.user._id;

      // Create a new Plan instance with the provided data
      const plan = new Plan({
        ...planData,
        isChecked: false,
      });

      // Save the new plan to the database
      const createdPlan = await plan.save();

      // Send a 201 status (Created) with the created plan in the response
      res.status(201).json(createdPlan);
    } catch (error) {
      // Handle errors during the plan creation process
      console.error("Error creating plan:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//===================
// Fetch all plans (sorted by latest)
//===================
planRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const plans = await Plan.find({}).sort({ createdAt: -1 }); // Sort by latest
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//===================
// Fetch plan by ID
//===================
planRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (plan) {
        res.json(plan);
      } else {
        res.status(404).json({ message: "Plan not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//===================
// Update a plan by ID
//===================
planRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const planId = req.params.id;
      const { name, price, choice, range, description, isChecked } = req.body; // Add isChecked here

      const plan = await Plan.findById(planId);

      if (plan) {
        plan.name = name;
        plan.price = price;
        plan.choice = choice;
        plan.range = range;
        plan.description = description;
        plan.isChecked = isChecked; // Set isChecked property

        const updatedPlan = await plan.save();
        res.json(updatedPlan);
      } else {
        res.status(404).json({ message: "Plan not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//===================
// Delete a plan by ID
//===================
planRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const planId = req.params.id;

      // Delete the plan document from the database
      const result = await Plan.deleteOne({ _id: planId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Plan not found" });
      }

      res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default planRouter;
