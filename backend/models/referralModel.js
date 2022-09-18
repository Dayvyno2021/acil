import mongoose from "mongoose";

const refSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserModel" },
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "ProductModel" },
  packageType: { type: String, required: true },
  refPayout: { type: Number, required: true },
  payOutDate: { type: Date, required: true },
  amount:{type:Number, required: true}
  
}, {
  timestamps: true
})


const RefModel = mongoose.model("RefModel", refSchema);

export default RefModel;
