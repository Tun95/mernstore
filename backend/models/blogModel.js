import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "Your blog Title",
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      default: "blog description",
    },
    image: {
      type: String,
      default: "blog image",
    },
    comments: [commentSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate slug from title
blogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let title = this.title || "Default Title"; // Use a default title if it's missing or undefined
    let baseSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Check for duplicate slugs
    const existingBlog = await this.constructor.findOne({
      slug: baseSlug,
    });

    if (existingBlog) {
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

const Blog = mongoose.model("blog", blogSchema);
export default Blog;
