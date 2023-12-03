import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Default Title" },
    slug: { type: String, default: "default-slug" },
    image: { type: String },
    description: { type: String, default: "Default Description" },
    countDownTimer: {
      days: { type: Number, default: 0 },
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 0 },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// Pre-save middleware to generate slug from title
promotionSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
