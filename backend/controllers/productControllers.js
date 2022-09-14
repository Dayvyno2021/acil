// import { produces } from "../data/products.js";
import ProductModel from "../models/productModel.js";

//desc:  To fetch all products
//route: /api/products
//access: public

export const products = async (req, res) => {
  try {

    const produces = await ProductModel.find({});
    if (produces) {
      res.json(produces)
    } else {
      res.status(400).json({message: 'Could not find products'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: Find a single product
//route: /api/products/:id
//access: private

export const product = async (req, res) => {
  try {
    const pro = await ProductModel.findById(req.params.id);
    if (pro) {
      res.json(pro);
    } else {
      res.status(400).json({ message: "Could not find product" })
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}