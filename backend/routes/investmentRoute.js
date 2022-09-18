import express from "express";
import { order, placeorder } from "../controllers/investmentController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/placeorder').post(protect, placeorder);
router.route('/placeorder/:id').get(protect, order)

export default router