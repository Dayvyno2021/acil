import express from "express";
import { downlines, login, profile, profileImage, register, userImage } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import formidableMiddleware from 'express-formidable'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(protect, profile);
router.route('/downlines').get(protect, downlines);
router.route('/imageform').put(protect, formidableMiddleware(), profileImage)
router.route('/profile-image/:id').get(userImage)

export default router;