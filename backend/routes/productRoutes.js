import express from 'express';
import { addPackage, 
  allPackages, 
  createProduct, 
  deleteProduct, 
  delPackage, 
  product, 
  products, 
  updateProduct
} from '../controllers/productControllers.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(products);
router.route('/:id').get(product);
router.route('/new/create').post(protect, adminProtect, createProduct);
router.route('/update/:id').put(protect, adminProtect, updateProduct);
router.route('/delete/:id').delete(protect, adminProtect, deleteProduct);
router.route('/add-package').post(protect, adminProtect, addPackage);
router.route('/packages/all').get(allPackages);
router.route('/del-package/:id').delete(protect, delPackage);


export default router;