import express from "express";
import { order, placeorder, singleOrder } from "../controllers/investmentController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/placeorder').post(protect, placeorder);
router.route('/order/:id').get(protect, order);
router.route('/myorders').get(protect, singleOrder)

export default router