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
// Create a comment for a specific blog
//==================
blogRouter.post(
  "/:blogId/comment/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const { comment, name, email, image } = req.body;
        const newComment = {
          name,
          email,
          image,
          comment,
          user: req.user._id,
        };
        blog.comments.push(newComment);
        await blog.save(); // Save the blog first without populating

        // Now, fetch the updated blog with populated user information
        const updatedBlog = await Blog.findById(blog._id).populate(
          "user",
          "name email image profile"
        );

        res.status(201).json(updatedBlog);
        console.log(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      console.error("Error failed to create", error);
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
      const blog = await Blog.findById(req.params.blogId).populate("user");
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
      const { comment } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        {
          $set: { "comments.$[elem].comment": comment },
        },
        {
          arrayFilters: [{ "elem._id": req.params.commentId }],
          new: true,
        }
      ).populate("user", "name email image profile");
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

//=============================
// Delete a comment for a specific blog
//=============================
blogRouter.delete(
  "/:blogId/comment/delete/:commentId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        {
          $pull: { comments: { _id: req.params.commentId } },
        },
        {
          new: true,
        }
      ).populate("user", "name email image profile");
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
// Create a reply for a specific comment
//==================
blogRouter.post(
  "/:blogId/comment/:commentId/reply/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (blog) {
        const { text, avatarUrl, fullName } = req.body;
        const newReply = {
          userId: req.user._id,
          avatarUrl,
          fullName,
          text,
        };
        const comment = blog.comments.id(req.params.commentId);
        comment.replies.push(newReply);

        // Save the blog first
        await blog.save();

        // Reload the blog with populated comments.user field
        const updatedBlog = await Blog.findById(req.params.blogId)
          .populate("comments.user", "name email image profile")
          .exec();

        res.status(201).json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.error("Error failed to create", error);
    }
  })
);

//==================
// Update a reply for a specific comment
//==================
blogRouter.put(
  "/:blogId/comment/:commentId/reply/update/:replyId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { text } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        {
          $set: { "comments.$[elem1].replies.$[elem2].text": text },
        },
        {
          arrayFilters: [
            { "elem1._id": req.params.commentId },
            { "elem2._id": req.params.replyId },
          ],
          new: true,
        }
      ).populate("user", "name email image profile");
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

//=============================
// Delete a reply for a specific comment
//=============================
blogRouter.delete(
  "/:blogId/comment/:commentId/reply/delete/:replyId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        {
          $pull: { "comments.$[elem].replies": { _id: req.params.replyId } },
        },
        {
          arrayFilters: [{ "elem._id": req.params.commentId }],
          new: true,
        }
      ).populate("user", "name email image profile");
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

export default blogRouter;
