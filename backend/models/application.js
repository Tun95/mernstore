import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    
    taxNumber: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Apply = mongoose.model("Apply", applySchema);
export default Apply;
