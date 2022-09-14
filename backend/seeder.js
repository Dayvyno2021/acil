// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'
import {produces} from './data/products.js';
import UserModel from './models/userModel.js';
import ProductModel from './models/productModel.js';
import { connectDb } from './config/db.js';

dotenv.config();
connectDb();


const importData = async() => {
  try {
    await ProductModel.deleteMany();

    const adminUser = await UserModel.findOne({name: 'Admin'})

    const adminProducts = produces.map((product)=> {
      return {...product, user: adminUser}
    })

    await ProductModel.insertMany(adminProducts);

    console.log('Data successfully imported'.bgGreen)
    process.exit()
    
  } catch (error) {
    console.log(`Could not import Data: ${error}`.bgRed)
    process.exit(1);
  }
}

const destroyData = async() => {
  try {
    await ProductModel.deleteMany();
    console.log('Data destroyed'.underline.red)
  } catch (error) {
    console.error(`Could not destroy data: ${error}`.bgRed)
  }
}

if (process.argv[2] === '-d'){
  destroyData()
} else {
  importData();
}