// const mongoose = require("mongoose");
import mongoose from "mongoose";

const investmentModel = mongoose.Schema(
  {
    amount: { type: Number, default: true },
    payout: { type: Number, default: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const investment = mongoose.model("Investment", investmentModel);

export { investment };
