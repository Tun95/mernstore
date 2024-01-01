import mongoose from "mongoose";
import { nanoid } from "nanoid";

const reviewSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slug: { type: String },
    keygen: { type: String },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    subitem: {
      type: String,
    },
    color: [
      {
        colorName: { type: String },
        colorImg: { type: String },
      },
    ],
    brand: { type: String },
    price: { type: Number, default: 0 },
    images: [String],
    specifications: [
      {
        description: { type: String },
        image: { type: String },
      },
    ],
    weight: {
      type: String,
    },
    video: [
      {
        videoTitle: { type: String },
        videoLink: { type: String },
        videoThumbnail: { type: String },
        videoDescription: { type: String },
      },
    ],
    description: { type: String },
    features: [
      {
        featureName: { type: String },
        subFeatures: [{ type: String }],
      },
    ],
    promotion: { type: String },
    countInStock: { type: Number, default: 0 },
    numSales: { type: Number, default: 0 },
    sold: [
      {
        value: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
      },
    ],
    discount: { type: Number, default: 0 },
    blackFriday: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Fields for affiliate functionality
    affiliateEnabled: { type: Boolean, default: false }, // Indicates if the product supports affiliate program
    affiliateCommissionRate: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals to be included in toJSON output
    toObject: { virtuals: true }, // Enable virtuals to be included in toObject output
  }
);

// Create the slug before saving the product
productSchema.pre("save", async function (next) {
  if (this.isModified("name") || !this.slug) {
    let name = this.name || "Default Name";
    let baseSlug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Check for duplicate slugs
    const existingProduct = await this.constructor.findOne({ slug: baseSlug });

    if (existingProduct) {
      let counter = 1;
      while (
        await this.constructor.findOne({ slug: `${baseSlug}-${counter}` })
      ) {
        counter++;
      }
      this.set("slug", `${baseSlug}-${counter}`);
    } else {
      this.set("slug", baseSlug);
    }
  }
  if (!this.keygen) {
    const generatedKeygen = nanoid(11).toUpperCase(); // Convert to uppercase
    this.set("keygen", generatedKeygen);
  }
  next();
});

//Virtual method to populate created order
productSchema.virtual("order", {
  ref: "Order",
  foreignField: "orderItems.product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);
export default Product;
