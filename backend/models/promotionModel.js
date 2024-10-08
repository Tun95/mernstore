import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Default Title" },
    subTitle: { type: String },
    slug: { type: String, default: "default-slug" },
    image: { type: String },
    description: { type: String, default: "Default Description" },
    expirationDate: Date,
    isChecked: { type: Boolean, default: false },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save middleware to generate slug from title
promotionSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let title = this.title || "Default Title"; // Use a default title if it's missing or undefined
    let baseSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Check for duplicate slugs
    const existingPromotion = await this.constructor.findOne({
      slug: baseSlug,
    });

    if (existingPromotion) {
      let counter = 1;
      while (
        await this.constructor.findOne({
          slug: `${baseSlug}-${counter}`,
        })
      ) {
        counter++;
      }
      this.slug = `${baseSlug}-${counter}`;
    } else {
      this.slug = baseSlug;
    }
  }
  next();
});

//Virtual method to populate created product
promotionSchema.virtual("products", {
  ref: "Product",
  foreignField: "promotion",
  localField: "_id",
});

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
