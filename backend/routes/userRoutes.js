import express from "express";
import { deleteNotification, deleteUser, downlines, getAllInvestors, imageConfirm, login, makeAdmin, myProfile, profile, profileImage, register, updateUser, userImage, withdrawalRequest } from "../controllers/userControllers.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";
import formidableMiddleware from 'express-formidable';
import { upload } from "./imageRoute.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/downlines').get(protect, downlines);
router.route('/profile-image/:id').get(userImage);
router.route('/profile-image').get(protect, imageConfirm);
router.route('/update/:id').put(protect, updateUser)
router.route('/userprofile/userprofile/:id').get(protect, adminProtect, profile);
router.route('/allinvestors').get(protect ,adminProtect, getAllInvestors)
router.route('/make-user-an-admin/:id').put(protect ,adminProtect, makeAdmin)
router.route('/admin-deletes-user/:id').delete(protect ,adminProtect, deleteUser)
router.route('/my-profile').get(protect, myProfile);
router.route('/my-profile/:id').delete(protect, deleteNotification);
router.route('/make-request/:id').get(protect, withdrawalRequest);

router.route('/imageform').post(protect, formidableMiddleware(), profileImage)

// router.route('/imageform').put(upload.single('image'), protect, profileImage)




// router.post("/upload-image", upload.single("image"), ImageController.singleImageUpload);
export default router;