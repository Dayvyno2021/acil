import express from "express";
import { allReferrals, deleteReferral, mydownlines, singlePayout, updateReferral } from "../controllers/referralController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/mydownline/:ref').get(protect, mydownlines);
router.route('/all-downlines').get(protect, adminProtect, allReferrals);
router.route('/delete-referral/:id').delete(protect, adminProtect, deleteReferral);
router.route('/update-to-paidout/:id').put(protect, adminProtect, updateReferral);
router.route('/single/:id').get(protect, adminProtect, singlePayout);

export default router;