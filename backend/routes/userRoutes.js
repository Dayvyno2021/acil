import express from "express";
import { deleteNotification, deleteUser, downlines, getAllInvestors, login, makeAdmin, myProfile, profile, profileImage, register, updateUser, userImage, withdrawalRequest } from "../controllers/userControllers.js";
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
router.route('/my-profile').get(protect, myProfile);
router.route('/my-profile/:id').delete(protect, deleteNotification);
router.route('/make-request/:id').get(protect, withdrawalRequest);

export default router;