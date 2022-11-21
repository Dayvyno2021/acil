// import { produces } from "../data/products.js";
import ProductModel from "../models/productModel.js";
import packageModel from "../models/packageModel.js";

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

//desc: Admin adds package
//route: post /api/products/add-package
//access: protected, adminProtected

export const addPackage = async (req, res) => {
  try {
    const { packageType, amount} = req.body;
    // console.log({ packageType, amount, userID: req.user._id });
    const exists1 = await packageModel.findOne({ packageType });
    const exists2 = await packageModel.findOne({ amount });
    if (exists1 || exists2) {
      res.status(400).json({message: 'one or all credentials already exists'})
    } else {
      const newPackage = await packageModel.create({
        addedBy: req.user._id,
        packageType,
        amount
      })
      if (newPackage) {
        res.json('Package Successfully Added')
      } else {
        res.status(400).json({message: 'Could not add package'})
      }
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===>${m}`
    })
  }
}

//desc: get list of packages
//route: /api/products/packages/all
//access: public

export const allPackages = async (req, res) => {
  try {
    const packages = await packageModel.find({});
    if (packages) {
      res.json(packages);
    } else {
      res.status(400).json({message: 'Could not find packages'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===> ${m}`
    })
  }
}

//desc: delete a package
//route: /api/products/del-package/:id
//access: protected and adminProtected

export const delPackage = async (req, res) => {
  try {
    const deleted = await packageModel.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json('successfully deleted');
    } else {
      res.status(400).json({message: 'Could not find package'})
    }
    
  } catch (error) {
    const m = process.env.NODE_ENV === 'production' ? '' : error;
    res.status(404).json({
      message: `Server Error===> ${m}`
    })
  }
}