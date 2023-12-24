import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import morgan from "morgan";
import uploadRouter from "./routes/uploadRoutes.js";
import sendEmailRouter from "./routes/emailMsgRoutes.js";
import stripeRouter from "./routes/stripeRoutes.js";
import settingsRoutes from "./routes/settingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import sizeRoutes from "./routes/sizeRoutes.js";
import wishRouter from "./routes/wishRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import passport from "passport";
import showRoutes from "./routes/showroomRoutes.js";
import wrapperRouter from "./routes/wrapperRoutes.js";
import updateRouter from "./routes/updateRoutes.js";
import promotionRouter from "./routes/promotionRoutes.js";
import Promotion from "./models/promotionModel.js";
import blogRouter from "./routes/blogRoutes.js";
import planRouter from "./routes/planRoutes.js";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(passport.initialize());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

const corsOptions = {
  origin: "https://mernstore-app.vercel.app",
  methods: "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
  credentials: true,
};

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paypalClientId = process.env.PAYPAL_CLIENT_ID || "sb";
app.get("/", (req, res) => {
  res.render("index", { paypalClientId });
});
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/get-stripe-key", (req, res) => {
  res.send({ key: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.use("/api/message", sendEmailRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/wishes", wishRouter);
app.use("/api/orders", orderRouter);

app.use("/api/category", categoryRoutes);

app.use("/api/brand", brandRoutes);
app.use("/api/size", sizeRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/price", priceRoutes);

app.use("/api/promotions", promotionRouter);

app.use("/api/banner", bannerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/checkout", stripeRouter);
app.use("/api/apply", applicationRoutes);
app.use("/api/showroom", showRoutes);
app.use("/api/wrappers", wrapperRouter);
app.use("/api/updates", updateRouter);

app.use("/api/blog", blogRouter);
app.use("/api/plans", planRouter);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

// Namespace for all promotions
const allPromotionsNamespace = io.of("/all-promotions");
allPromotionsNamespace.on("connection", async (socket) => {
  console.log("A user connected to all promotions");
  try {
    const allPromotions = await Promotion.find();
    socket.emit("promotionUpdate", { promotion: allPromotions });
  } catch (error) {
    console.error("Error fetching initial promotion data:", error);
  }
});

// Namespace for checked promotions
const checkedPromotionsNamespace = io.of("/checked-promotions");
checkedPromotionsNamespace.on("connection", async (socket) => {
  console.log("A user connected to checked promotions");
  try {
    const checkedPromotions = await Promotion.find({ isChecked: true });
    socket.emit("promotionUpdate", { promotion: checkedPromotions });
  } catch (error) {
    console.error("Error fetching initial promotion data:", error);
  }
});

// Dynamic namespace for promotion by slug
io.of(/^\/promotion-by-slug\/.+/).on("connection", async (socket) => {
  const namespace = socket.nsp.name;
  const slug = namespace.split("/")[2]; // get the slug from the namespace
  console.log(`A user connected to promotion: ${slug}`);

  // You can handle events related to a specific promotion here
  // Fetch the promotion data by slug and emit it to the client
  try {
    const promotion = await Promotion.findOne({ slug: slug });
    socket.emit("promotionUpdate", { promotion: promotion });
  } catch (error) {
    console.error(`Error fetching promotion data for slug: ${slug}`, error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
