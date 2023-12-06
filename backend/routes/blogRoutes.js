// ROUTES
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import { isAuth, isAdmin } from "../utils.js";

const blogRouter = express.Router();

//==================
// Create a new blog
//==================
blogRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, description, image, comments } = req.body;
      const newBlog = new Blog({
        title,
        description,
        image,
        comments,
        user: req.user._id, // Set the user field to the ID of the authenticated user
      });
      const createdBlog = await newBlog.save();
      res.status(201).json(createdBlog);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Fetch all blogs with pagination, sorted by latest createdAt
//==================
blogRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Parse the page number from the query, default to 1
      const limit = 5; // Set the limit to 5 blog posts per page
      const skip = (page - 1) * limit; // Calculate the number of documents to skip

      // Sort the blogs by createdAt in descending order to get the latest first
      const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

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
// Fetch all blogs, sorted by latest createdAt
//==================
blogRouter.get(
  "/blog-list",
  expressAsyncHandler(async (req, res) => {
    try {
      // Sort the blogs by createdAt in descending order to get the latest first
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==============================
// Fetch recent blogs (sorted by latest createdAt)
//==============================
blogRouter.get(
  "/recent",
  expressAsyncHandler(async (req, res) => {
    try {
      const limit = 3; // Set the limit to the number of recent posts you want

      // Sort the blogs by createdAt in descending order to get the latest first
      const recentBlogs = await Blog.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();

      res.json(recentBlogs);
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
      const blog = await Blog.findOne({ slug: req.params.slug }).populate(
        "user"
      );
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
  isAuth,
  isAdmin,
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
  isAuth,
  isAdmin,
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
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const { name, email, image, comment } = req.body;
        const newComment = {
          name,
          email,
          image,
          comment,
          user: req.user._id, 
        };
        blog.comments.push(newComment);
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

//=============================
// Fetch all comments for a specific blog
//=============================
blogRouter.get(
  "/:blogId/comments",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        res.json(blog.comments);
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
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const comment = blog.comments.id(req.params.commentId);

        // Check if the user making the request is the owner of the comment
        if (comment && comment.user.equals(req.user._id)) {
          comment.set(req.body);
          const updatedBlog = await blog.save();
          res.json(updatedBlog);
        } else {
          res
            .status(403)
            .json({ message: "Unauthorized to update this comment" });
        }
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//=============================
// Delete a comment for a specific blog
//=============================
blogRouter.delete(
  "/:blogId/comment/delete/:commentId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const comment = blog.comments.id(req.params.commentId);

        // Check if the user making the request is the owner of the comment
        if (comment && comment.user.equals(req.user._id)) {
          comment.remove();
          const updatedBlog = await blog.save();
          res.json(updatedBlog);
        } else {
          res
            .status(403)
            .json({ message: "Unauthorized to delete this comment" });
        }
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default blogRouter;
