import express from 'express';
import { createProduct, deleteProduct, product, products, updateProduct } from '../controllers/productControllers.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(products);
router.route('/:id').get(product);
router.route('/new/create').post(protect, adminProtect, createProduct)
router.route('/update/:id').put(protect, adminProtect, updateProduct)
router.route('/delete/:id').delete(protect, adminProtect, deleteProduct)


export default router;