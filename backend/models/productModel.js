import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserModel"},
  name: { type: String, required:true },
  img: {type: String, required:true},
  ROI: { type: Number, required: true },
  maturity: {type: Number, required: true}
  },{
    timestamps: true,
  });

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;
