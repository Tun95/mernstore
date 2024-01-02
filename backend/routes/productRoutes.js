import express from "express";
import Product from "../models/productModels.js";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
import User from "../models/userModels.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const seller = req.query.seller || "";
  const sellerFilter = seller ? { seller } : {};
  const products = await Product.find({ ...sellerFilter })
    .populate("seller")
    .sort("-createdAt");
  res.send(products);
});

//=============
//TOP SALES FETCH
//=============
productRouter.get(
  "/top-sales",
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find()
        .sort({ numSales: -1 }) // Sort by numSales in descending order
        .limit(10); // Limit the result to 10 products

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

//=============
//DISCOUNT FETCH
//=============
productRouter.get("/discount", async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gte: 50 } })
      .populate("seller")
      .sort("-createdAt")
      .limit(10);
    res.send(products);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the products." });
  }
});

//=============
//NEW ARRIVAL FETCH
//=============
productRouter.get("/new-arrival", async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .limit(10); // Limit the results to 10 products

    res.send(latestProducts);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving new arrivals" });
  }
});

//=============
//FLASHDEAL FETCH
//=============
productRouter.get("/flashdeal", async (req, res) => {
  try {
    const seller = req.query.seller || ""; // Get the seller query parameter
    const sellerFilter = seller ? { seller } : {}; // Create the seller filter object
    const products = await Product.find({ flashdeal: true, ...sellerFilter })
      .populate("seller")
      .sort("-createdAt")
      .limit(10);
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve flashdeal products" });
  }
});

//================
// CREATE PRODUCT
//================
productRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, ...productData } = req.body;

      // Ensure that required fields are present
      if (!name) {
        return res.status(400).send({ message: "Name is a required field" });
      }

      // Check if the product name already exists
      const productNameExist = await Product.findOne({ name });

      if (productNameExist) {
        return res.status(400).send({ message: "Product name already exists" });
      }

      // Create a new product with the logged-in user as the seller
      const newProduct = new Product({
        seller: req.user._id, // Set the seller to the logged-in user's ID
        name,
        ...productData,
      });

      // Save the new product
      const product = await newProduct.save();

      res
        .status(201)
        .send({ message: "Product Created Successfully", product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

//===========================
//ADMIN PRODUCT DETAILS BY ID
//===========================
productRouter.get("/admin/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
      {
        $addFields: {
          seller: { $ifNull: ["$seller", null] }, // Set a default value for seller if it's not present
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "orderItems.product",
          as: "orders",
        },
      },
      {
        $addFields: {
          sold: { $slice: ["$sold", -3] }, // Limit the 'sold' array to the last 3 entries
        },
      },
    ]);

    if (product.length === 0) {
      return res.status(404).send({ message: "Product Not Found" });
    }

    // Assuming there's only one product with the given ID
    res.send(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//=================
// UPDATING PRODUCT
//=================
productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
      // Find the product by ID
      const product = await Product.findById(productId);

      // Check if the product exists
      if (!product) {
        return res.status(404).send({ message: "Product Not Found" });
      }

      // Update product properties based on the request body using the spread operator
      Object.assign(product, req.body);

      // Save the updated product
      await product.save();

      // Send a success response
      res.send({ message: "Product Updated", updatedProduct: product });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

//============================
// AFFILIATE PRODUCTS APPROVAL
//============================
// Update product for affiliate promotion
productRouter.patch(
  "/affiliate/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      const { affiliateEnabled, affiliateCommissionRate } = req.body;

      // Find the product by ID
      const product = await Product.findById(productId);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Update affiliate fields
      product.affiliateEnabled = affiliateEnabled;
      product.affiliateCommissionRate = affiliateCommissionRate;

      // Save the updated product
      const updatedProduct = await product.save();

      res.json({
        message: "Product updated for affiliate promotion",
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

//=======================
//SELLER'S PRODUCT CROSS CHECK
//=======================
productRouter.post(
  "/seller",
  isAuth,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const sellerId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
      // Fetch products with the specified seller
      const products = await Product.find({ "seller.id": sellerId });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

//================
// PRODUCT DELETE
//================
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (product) {
        // Check if the logged-in user is an admin
        if (req.user.isAdmin) {
          // Use deleteOne to remove the product
          await Product.deleteOne({ _id: productId });
          res.send({ message: "Product Deleted Successfully" });
        } else {
          res.status(403).send({ message: "Permission Denied" });
        }
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

//===========================
// SALE PERFORMANCE
//===========================
productRouter.get(
  "/sales-performance/:id",
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const salesPerformance = await Product.aggregate([
        // Match the specific product by its ID and createdAt greater than or equal to three days ago
        {
          $match: {
            _id: mongoose.Types.ObjectId(productId),
            createdAt: { $gte: threeDaysAgo },
          },
        },
        // Group by date in the specified format and sum up the numSales for each date
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            totalSales: { $sum: "$numSales" }, // Sum up the numSales for each date
          },
        },
        // Sort the results by date in ascending order
        { $sort: { _id: 1 } },
      ]);

      res.status(200).json(salesPerformance);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while fetching sales performance",
      });
    }
  })
);

//==================================
// Route for creating a product review
//==================================
productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      if (product.reviews.find((x) => x.email === req.user.email)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }

      const review = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        image: req.user.image,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;

      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//==================================
// Route for fetching all product reviews
//==================================
productRouter.get(
  "/:id/reviews",
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      res.send(product.reviews);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//==================================
// Route for fetching a specific product review by review ID
//==================================
productRouter.get(
  "/:id/reviews/:reviewId",
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      const review = product.reviews.find(
        (x) => x._id.toString() === req.params.reviewId
      );

      if (review) {
        res.send(review);
      } else {
        res.status(404).send({ message: "Review Not Found" });
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//==================================
// Route for updating a specific product review by review ID
//==================================
productRouter.put(
  "/:id/reviews/:reviewId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      const reviewIndex = product.reviews.findIndex(
        (x) => x._id.toString() === req.params.reviewId
      );

      if (reviewIndex !== -1) {
        const updatedReview = {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          image: req.user.image,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };

        product.reviews[reviewIndex] = updatedReview;

        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;

        await product.save();

        res.send({
          message: "Review Updated",
          review: updatedReview,
          rating: product.rating,
        });
      } else {
        res.status(404).send({ message: "Review Not Found" });
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//==================================
// Route for deleting a specific product review by review ID
//==================================
productRouter.delete(
  "/:id/reviews/:reviewId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      const reviewIndex = product.reviews.findIndex(
        (x) => x._id.toString() === req.params.reviewId
      );

      if (reviewIndex !== -1) {
        product.reviews.splice(reviewIndex, 1);
        product.numReviews = product.reviews.length;

        if (product.numReviews === 0) {
          product.rating = 0;
        } else {
          product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        }

        await product.save();

        res.send({
          message: "Review Deleted",
          numReviews: product.numReviews,
          rating: product.rating,
        });
      } else {
        res.status(404).send({ message: "Review Not Found" });
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//ADMIN PRODUCT LIST
const ADMIN_PAGE_SIZE = 15;
productRouter.get(
  "/admin",
  // isAuth,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const seller = query.seller || "";
    const pageSize = query.pageSize || ADMIN_PAGE_SIZE;

    //const sellerFilter = seller ? { seller } : {};
    const sellerFilter = seller && seller !== "all" ? { seller } : {};
    const products = await Product.find({})
      .populate(
        "seller",
        "seller.name seller.logo seller.rating seller.numReviews"
      )
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort("-createdAt");

    const countProducts = await Product.countDocuments({
      ...sellerFilter,
    });

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

//==============
//PRODUCT FILTER
//==============
const PAGE_SIZE = 12;
productRouter.get(
  "/store",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const color = query.color || "";
    const price = query.price || "";
    const numSales = query.numSales || "";
    const discount = query.discount || "";
    const rating = query.rating || "";
    const brand = query.brand || "";
    const subcategory = query.subcategory || "";
    const subitem = query.subitem || "";
    const feature = query.feature || ""; // Add feature filter
    const searchQuery = query.query || "";

    // Find the seller with the highest rating
    const highestRatedSeller = await User.findOne({})
      .sort({ "seller.rating": -1 })
      .limit(1);

    const sellerFilter = highestRatedSeller
      ? { "seller.name": highestRatedSeller.seller.name }
      : {};

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category ? { "category.name": category } : {};
    const subcategoryFilter = subcategory
      ? { "category.subCategories.name": subcategory }
      : {};
    const subitemFilter = subitem
      ? { "category.subCategories.subItems.name": subitem }
      : {};
    const colorFilter =
      color && color !== "all"
        ? { "color.colorName": { $in: color.split(",") } }
        : {};
    const brandFilter =
      brand && brand !== "all" ? { brand: { $in: brand.split(",") } } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            "seller.rating": {
              $gte: Number(rating),
            },
          }
        : {};
    const numSalesFilter =
      numSales && numSales !== "all"
        ? {
            numSales: {
              $gte: Number(numSales),
            },
          }
        : {};
    const discountFilter =
      discount && discount !== "all"
        ? {
            discount: {
              $gte: 50,
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const featureFilter =
      feature && feature !== "all"
        ? {
            "features.subFeatures": { $in: feature.split(",") }, // Updated for multiple features
          }
        : {};

    const countInStockFilter = {
      countInStock: { $gt: 0 },
    };

    const sortOrder =
      query.order === "featured"
        ? { featured: -1 }
        : query.order === "lowest"
        ? { price: 1 }
        : query.order === "highest"
        ? { price: -1 }
        : query.order === "toprated"
        ? { rating: -1 }
        : query.order === "numsales"
        ? { numSales: -1 }
        : query.order === "discount"
        ? { discount: -1 }
        : query.order === "newest"
        ? { createdAt: -1 }
        : query.order === "countinstock"
        ? { countInStock: -1, countInStock: { $gt: 0 } }
        : { _id: -1 };

    const filters = {
      ...queryFilter,
      ...categoryFilter,
      ...subcategoryFilter,
      ...subitemFilter,
      ...sellerFilter,
      ...colorFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
      ...numSalesFilter,
      ...discountFilter,
      ...featureFilter,
      ...countInStockFilter,
    };

    const products = await Product.find(filters)
      .populate("seller")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments(filters);

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

//=========================
//SHOPFINITY PRODUCT FILTER
//=========================
const PAGE_PRODUCT_SIZE = 8;
productRouter.get(
  "/shop",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_PRODUCT_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const color = query.color || "";
    const size = query.size || "";
    const price = query.price || "";
    const numSales = query.numSales || "";
    const discount = query.discount || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const brand = query.brand || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter =
      category && category !== "all"
        ? { category: { $in: category.split(",") } }
        : {};

    const sizeFilter =
      size && size !== "all" ? { size: { $in: size.split(",") } } : {};
    const colorFilter =
      color && color !== "all" ? { color: { $in: color.split(",") } } : {};
    const brandFilter =
      brand && brand !== "all" ? { brand: { $in: brand.split(",") } } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const numSalesFilter =
      numSales && numSales !== "all"
        ? {
            numSales: {
              $gte: Number(numSales),
            },
          }
        : {};
    const discountFilter =
      discount && discount !== "all"
        ? {
            discount: {
              $gte: 50,
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "numsales"
        ? { numSales: -1 }
        : order === "discount"
        ? { discount: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const filters = {
      ...queryFilter,
      ...categoryFilter,

      ...colorFilter,
      ...sizeFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
      ...numSalesFilter,
      ...discountFilter,
    };

    const products = await Product.find(filters)
      .populate("seller wish")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments(filters);

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
    console.log(discountFilter); // Check the discount filter object
  })
);

//************
// FETCH CATEGORIES
//************
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.distinct("category");
    res.send(categories);
  })
);

//************
// FETCH FEATURES
//************
productRouter.get(
  "/features",
  expressAsyncHandler(async (req, res) => {
    const features = await Product.distinct("features");
    res.send(features);
  })
);

//************
// FETCH BRANDS
//************
productRouter.get(
  "/brands",
  expressAsyncHandler(async (req, res) => {
    const brands = await Product.distinct("brand");
    res.send(brands);
  })
);

// ===========================
// PRODUCT DETAILS BY SLUG
// ===========================
productRouter.get("/slug/:slug", async (req, res) => {
  const decodedSlug = decodeURIComponent(req.params.slug); // Decode the slug
  const product = await Product.findOne({ slug: decodedSlug }).populate(
    "seller wish"
  );

  if (!product) {
    return res.status(404).send({ message: "Product Not Found" });
  }

  if (req.query.affiliateCode) {
    // If the request contains an affiliateCode, provide the affiliate link
    const affiliateCode = req.query.affiliateCode;
    const affiliateLink = `${
      process.env.SUB_DOMAIN
    }/product/${encodeURIComponent(
      product.slug
    )}?affiliateCode=${affiliateCode}`;

    // Send the product details along with the affiliate link in the response
    res.send({ product, affiliateLink });
  } else {
    // If no affiliateCode is provided, send only the product details
    res.send(product);
  }
});

//===============
//RELATED PRODUCT
//===============
productRouter.get("/related/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const related = await Product.find({
      _id: { $ne: product._id }, // Use product._id instead of product
      category: product.category,
    })
      .limit(6)
      .populate("category", "name");

    console.log("RELATED PRODUCTS", related);
    res.json(related);
  } catch (err) {
    console.log(err);
  }
});

// ===========================
// AFFILIATE LINKS FOR PRODUCT
// ===========================
productRouter.get("/affiliate/:slug", async (req, res) => {
  try {
    const decodedSlug = decodeURIComponent(req.params.slug); // Decode the slug
    const product = await Product.findOne({ slug: decodedSlug }).populate(
      "seller"
    );

    if (!product) {
      return res.status(404).send({ message: "Product Not Found" });
    }

    const { affiliateCode } = req.query;
    const affiliateLink = `${
      process.env.SUB_DOMAIN
    }/product/slug/${encodeURIComponent(
      product.slug
    )}?affiliateCode=${affiliateCode}`;

    // Send the product details along with the affiliate link in the response
    res.send({ product, affiliateLink });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//PRODUCT DETAILS BY ID
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "seller order"
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
