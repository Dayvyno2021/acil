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

//desc: Admin create new product
//route: /api/products/create
//access: protected, adminProtected

export const createProduct = async (req, res) => {
  try {
    const { name, ROI, maturity, imgPath } = req.body;

    const product = await ProductModel.create({
      user: req.user._id,
      name,
      ROI,
      maturity,
      img: imgPath
    })

    if (product) {
      res.json(product)
    } else {
      res.status(400).json({message: "Could not create product"})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: Admin Update existing product
//route: Put /api/products/update/:id
//access: protected, adminProtected

export const updateProduct = async (req, res) => {
  try {
    const { name, ROI, maturity } = req.body;
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (product) {
      product.name = name || product.name;
      product.ROI = ROI || product.ROI;
      product.maturity = maturity || product.maturity;

      await product.save();
      res.json('Successful')
    } else {
      res.status(400).json({message: "Could not find product"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: Admin delete product
//route: Put /api/products/delete/:id
//access: protected, adminProtected

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    if (product) {
      res.json('Successful');
    } else {
      res.status(400).json({message: "Could not delete product"})
    }
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}