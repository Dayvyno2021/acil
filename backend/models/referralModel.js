import mongoose from "mongoose";

const refSchema = mongoose.Schema({
  referral: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  refCode: {type: String},
  pack: {
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"},
    name: { type: String, required: true },
    ROI: { type: Number, required: true },
    maturity: { type: Number, required: true },
    packageType: { type: String, required: true },
    amount: { type: Number, required:true },   
},
  refPayout: { type: Number},
  payOutDate: { type: Date},
  amount: { type: Number },
  isPaidOut: {type: Boolean, default: false}
  
}, {
  timestamps: true
})


const RefModel = mongoose.model("RefModel", refSchema);

export default RefModel;
