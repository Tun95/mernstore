import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    convenientTimeFrom: { type: String, required: true },
    convenientTimeTo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Calls = mongoose.model("Calls", callSchema);
export default Calls;
