import express from "express";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import imageRoute from "./routes/imageRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import investmentRoute from "./routes/investmentRoute.js";
import referralRoute from "./routes/referralRoute.js";
import emailRoute from "./routes/emailRoute.js"
import path from "path";
import cors from "cors";
dotenv.config();

connectDb();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/investment", investmentRoute);
app.use("/api/referral", referralRoute);
app.use('/api/email', emailRoute);
app.get("/paystack-key", (req, res) => res.send(process.env.PAYSTACK_TEST_KEY));
app.use(imageRoute);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Website is working");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.rainbow
  )
);
