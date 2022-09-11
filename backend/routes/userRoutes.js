import express from "express";
import { login, profile, register } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(protect, profile)

export default router;