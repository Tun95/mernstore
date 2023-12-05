// ROUTES
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

const blogRouter = express.Router();

//==================
// Create a new blog
//==================
blogRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, description, image, comments } = req.body;
      const newBlog = new Blog({ title, description, image, comments });
      const createdBlog = await newBlog.save();
      res.status(201).json(createdBlog);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch all blogs with pagination
//==================
blogRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Parse the page number from the query, default to 1
      const limit = 5; // Set the limit to 5 blog posts per page
      const skip = (page - 1) * limit; // Calculate the number of documents to skip

      const blogs = await Blog.find().skip(skip).limit(limit).exec();

      const totalBlogs = await Blog.countDocuments(); // Get the total number of blogs

      res.json({
        blogs,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch blog by ID
//==================
blogRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch blog by slug
//==================
blogRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Update blog by ID
//==================
blogRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, description, image, comments } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, description, image, comments },
        { new: true }
      );
      if (updatedBlog) {
        res.json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Delete blog by ID
//==================
blogRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (deletedBlog) {
        res.json({ message: "Blog deleted successfully" });
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Create a comment for a specific blog
//==================
blogRouter.post(
  "/:blogId/comment/create",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        blog.comments.push(req.body);
        const updatedBlog = await blog.save();
        res.status(201).json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Update a comment for a specific blog
//==================
blogRouter.put(
  "/:blogId/comment/update/:commentId",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const comment = blog.comments.id(req.params.commentId);
        if (comment) {
          comment.set(req.body);
          const updatedBlog = await blog.save();
          res.json(updatedBlog);
        } else {
          res.status(404).json({ message: "Comment not found" });
        }
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Delete a comment for a specific blog
//==================
blogRouter.delete(
  "/:blogId/comment/delete/:commentId",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        blog.comments.id(req.params.commentId).remove();
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default blogRouter;
