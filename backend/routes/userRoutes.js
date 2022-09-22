import express from "express";
import { deleteUser, downlines, getAllInvestors, login, makeAdmin, profile, profileImage, register, updateUser, userImage } from "../controllers/userControllers.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";
import formidableMiddleware from 'express-formidable'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/downlines').get(protect, downlines);
router.route('/imageform').put(protect, formidableMiddleware(), profileImage)
router.route('/profile-image/:id').get(userImage);
router.route('/update/:id').put(protect, updateUser)
router.route('/userprofile/userprofile/:id').get(protect, adminProtect, profile);
router.route('/allinvestors').get(protect ,adminProtect, getAllInvestors)
router.route('/make-user-an-admin/:id').put(protect ,adminProtect, makeAdmin)
router.route('/admin-deletes-user/:id').delete(protect ,adminProtect, deleteUser)

export default router;