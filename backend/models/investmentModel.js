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
    isPaidOut:{type: Boolean, default: false},
    paymentType: {type: String,},
    payoutDate: { type: Date},
    payment: {
      isPaid: { type: Boolean, required: true, default: false },
      paymentStatus: { type: String },
      paymentDate: { type: String },
      confirmDate: {type: String}
    },
    paystack: {
      reference: { type: String },
      trans: { type: String },
      status: { type: String },
      transaction: { type: String },
      message: {type: String}
    }
  },
  {
    timestamps: true,
  }
);

const InvestmentModel = mongoose.model("InvestmentModel", investmentSchema);

export default InvestmentModel ;
