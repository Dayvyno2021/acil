import express from "express";
import { placeorder } from "../controllers/investmentController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/placeorder').post(protect, placeorder);

export default router