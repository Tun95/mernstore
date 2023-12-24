import mongoose from "mongoose";

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
    slug: { type: String, required: true, unique: true },
    keygen: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category.subCategories", // Reference the subcategories within the Category
    },
    subitem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category.subCategories.subItems", // Reference the subitems within the subcategories
    },
    color: [
      {
        colorName: { type: String },
        colorLink: { type: String },
      },
    ],
    brand: { type: String },
    price: { type: Number, default: 0 },
    images: [String],
    specifications: [
      {
        name: { type: String },
        image: { type: String },
      },
    ],
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
        name: { type: String },
        subFeatures: [{ type: String }],
      },
    ],
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
  next();
});

//Virtual method to populate created order
productSchema.virtual("order", {
  ref: "Order",
  foreignField: "orderItems.product",
  localField: "_id",
});

//Virtual method to populate created order
productSchema.virtual("promotion", {
  ref: "Promotion",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);
export default Product;
