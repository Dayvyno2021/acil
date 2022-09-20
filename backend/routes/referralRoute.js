import express from "express";
import { mydownlines } from "../controllers/referralController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/mydownline/:ref').get(protect, mydownlines);

export default router;