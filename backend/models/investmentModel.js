// const mongoose = require("mongoose");
import mongoose from "mongoose";

const investmentSchema = mongoose.Schema(
  {
    investor: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    pack: {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel", required: true },
      name: { type: String, required: true },
      ROI: { type: Number, required: true },
      maturity: { type: Number, required: true },
      packageType: { type: String, required: true },
      amount: { type: Number, required:true },   
    },
    payout: { type: Number, required: true },
    payoutDate: { type: Date},
    payment: {
      isPaid: { type: Boolean, required: true, default: false },
      paymentDate: { type: String },
      paymentStatus: {type: String}
    },
  },
  {
    timestamps: true,
  }
);

const InvestmentModel = mongoose.model("InvestmentModel", investmentSchema);

export default InvestmentModel ;
