import express from 'express';
import { product, products } from '../controllers/productControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(products);
router.route('/:id').get(product);


export default router;