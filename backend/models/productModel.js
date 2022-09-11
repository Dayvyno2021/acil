// const mongoose = require("mongoose");
import mongoose from "mongoose";

const productModel = mongoose.Schema(
  {
    productName: { type: String, default: true },
    roi: { type: String, default: true },
    investors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productModel);

export { product };
