import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const expiresIn = "3d";
  const expirationTime =
    Math.floor(Date.now() / 1000) + expiresInToSeconds(expiresIn);

  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isAffiliate: user.isAffiliate,
      isBlocked: user.isBlocked,
      isLoggedIn: user.isLoggedIn,
      isAccountVerified: user.isAccountVerified,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn,
    }
  );
};

// Utility function to convert expiresIn string to seconds
const expiresInToSeconds = (expiresIn) => {
  const units = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1));

  return units[unit] * value;
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};

export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};
