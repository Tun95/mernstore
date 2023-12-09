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
      const limit = 3;

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
// Create a new comment for a blog
//==================
blogRouter.post(
  "/:blogId/create-comment",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, image, comment } = req.body;
      const blog = await Blog.findById(req.params.blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      blog.comments.push({ name, email, image, comment, user: req.user._id });
      const updatedBlog = await blog.save();
      res
        .status(201)
        .json(updatedBlog.comments[updatedBlog.comments.length - 1]);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//===================================
// Fetch all comments for a blog with pagination
//===================================
blogRouter.get(
  "/:blogId/comments",
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      // Calculate the starting index for pagination
      const startIndex = (page - 1) * limit;

      // Calculate the ending index for pagination
      const endIndex = page * limit;

      // Get the paginated comments
      const paginatedComments = blog.comments.slice(startIndex, endIndex);

      res.json({
        totalComments: blog.comments.length,
        totalPages: Math.ceil(blog.comments.length / limit),
        currentPage: page,
        comments: paginatedComments,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Update a comment for a blog
//==================
blogRouter.put(
  "/update/:blogId/:commentId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, image, comment } = req.body;
      const blog = await Blog.findById(req.params.blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const commentIndex = blog.comments.findIndex(
        (c) => c._id.toString() === req.params.commentId
      );

      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }

      blog.comments[commentIndex] = {
        name,
        email,
        image,
        comment,
        user: req.user._id,
      };

      const updatedBlog = await blog.save();
      res.json(updatedBlog.comments[commentIndex]);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

//==================
// Delete a comment for a blog
//==================
blogRouter.delete(
  "/delete/:blogId/:commentId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const commentIndex = blog.comments.findIndex(
        (c) => c._id.toString() === req.params.commentId
      );

      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }

      blog.comments.splice(commentIndex, 1);

      const updatedBlog = await blog.save();
      res.json({ message: "Comment deleted successfully", blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

export default blogRouter;
