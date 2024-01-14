import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Order from "./orderModels.js";

const reviewSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    country: { type: String },
    image: { type: String },
    isBlocked: { type: Boolean, default: false },
    application: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    password: { type: String, required: true },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      slug: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0 },
      numReviews: { type: Number, default: 0 },
      reviews: [reviewSchema],
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      longitude: { type: Number }, // Add this line for longitude
      latitude: { type: Number },
    },
    isAccountVerified: { type: Boolean, default: false },
    accountVerificationOtp: { type: String },
    accountVerificationOtpExpires: { type: Date },

    //Affiliate
    isAffiliate: { type: Boolean, default: false }, // Indicates if the user is an affiliate
    affiliateCode: { type: String, unique: true }, // Unique code for the affiliate user
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Stores the ID of the user who referred this user (optional)

    affiliateCommissionRate: { type: Number, default: 0.1 }, // Example: Commission rate for the affiliate
    totalEarnings: [
      {
        value: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
      },
    ], //  otherAffiliateData: { type: ... }, // Example: Any other data specific to the affiliate

    grandTotalEarnings: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    minimumWithdrawalAmount: { type: Number, default: 0 },
    withdrawnAmount: { type: Number, default: 0 },
    refundAmount: { type: Number, default: 0 },
    // Withdrawal requests made by the seller
    withdrawalRequests: [
      {
        amount: { type: Number, required: true },
        gateway: { type: String },
        email: { type: String },
        transactionId: { type: String },
        status: {
          type: String,
          enum: ["pending", "approved", "declined"],
          default: "pending",
        },
        requestDate: { type: Date, default: Date.now },
        approvalDate: { type: Date },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// Pre-save middleware to generate slug from seller name
userSchema.pre("save", async function (next) {
  if (
    (this.isModified("seller.name") || !this.seller.slug) &&
    this.seller.name
  ) {
    let sellerName = this.seller.name || "Default Seller"; // Use a default seller name if it's missing or undefined
    let baseSlug = sellerName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Check for duplicate slugs
    const existingUser = await this.constructor.findOne({
      "seller.slug": baseSlug,
    });

    if (existingUser) {
      let counter = 1;
      while (
        await this.constructor.findOne({
          "seller.slug": `${baseSlug}-${counter}`,
        })
      ) {
        counter++;
      }
      this.seller.slug = `${baseSlug}-${counter}`;
    } else {
      this.seller.slug = baseSlug;
    }
  }
  next();
});

// Generate and save an affiliate code for the user
userSchema.methods.generateAffiliateCode = async function () {
  // Generate a unique affiliate code using a combination of user's ID and a random string
  const randomString = crypto.randomBytes(5).toString("hex"); // Generate a 10-character random string
  const affiliateCode = `${this._id}${randomString}`; // Combine user's ID with the random string

  this.affiliateCode = affiliateCode;
  this.isAffiliate = true;

  // Save the user document
  await this.save();

  return affiliateCode;
};


// Optionally, you can add methods to track and calculate affiliate commissions and earnings
userSchema.methods.calculateAffiliateCommission = async function (amount) {
  // Calculate the commission based on the affiliate's commission rate and the given amount
  const commission = this.affiliateCommissionRate * amount;

  // Push the new commission object with the current date to the totalEarnings array
  this.totalEarnings.push({ value: commission, date: new Date() });

  // Save the updated user document
  await this.save();

  return commission;
};

// Method to calculate the grandTotalEarnings for a seller

userSchema.methods.calculateGrandTotalEarnings = async function () {
  try {
    // Calculate the grandTotalEarnings by aggregating the grandTotal from orders
    const orders = await Order.find({ seller: this._id, isPaid: true });
    const grandTotalEarnings = orders.reduce(
      (total, order) => total + order.grandTotal,
      0
    );

    // Calculate the total withdrawn amount from withdrawalRequests
    const totalWithdrawn = this.withdrawalRequests.reduce(
      (total, request) =>
        request.status === "approved" ? total + request.amount : total,
      0
    );

    // Calculate the available balance by deducting the total withdrawn from grandTotalEarnings
    this.availableBalance = grandTotalEarnings - totalWithdrawn;

    // Update the grandTotalEarnings field in the user document
    this.grandTotalEarnings = grandTotalEarnings;

    // Save the updated user document
    await this.save();

    return grandTotalEarnings;
  } catch (error) {
    throw new Error("Failed to calculate grandTotalEarnings for the seller.");
  }
};

//Sellers rating update
userSchema.methods.updateSellerRating = async function () {
  const numReviews = this.seller.reviews.length;
  if (numReviews > 0) {
    const totalRating = this.seller.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    this.seller.rating = totalRating / numReviews;
  } else {
    this.seller.rating = 0;
  }
  await this.save();
};

//Virtual method to populate created product
userSchema.virtual("products", {
  ref: "Product",
  foreignField: "seller",
  localField: "_id",
});

//Virtual method to populate created order
userSchema.virtual("order", {
  ref: "Order",
  foreignField: "user",
  localField: "_id",
});

//Virtual method to populate created applications
userSchema.virtual("apply", {
  ref: "Apply",
  foreignField: "user",
  localField: "_id",
});

//Verify Account
userSchema.methods.createAccountVerificationOtp = async function () {
  // Generate a random 6-digit verification code
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // Set the verification code and expiration time
  this.accountVerificationOtp = verificationCode;
  this.accountVerificationOtpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

  return verificationCode;
};

//Password Reset
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10mins
  return resetToken;
};

//Match Password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
