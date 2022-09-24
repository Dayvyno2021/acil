import express from "express";
import { allOrders, deleteOrder, order, placeorder, singleOrder, updateAsPaidOut, updateOrderAsPaid } from "../controllers/investmentController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/placeorder').post(protect, placeorder);

//fetches an individual order
router.route('/order/:id').get(protect, order);

//Fetches the orders of an investor
router.route('/myorders').get(protect, singleOrder) 

//Fetches all the orders for the admin
router.route('/all-orders').get(protect, adminProtect, allOrders) 

//Deletes an order
router.route('/delete/:id').delete(protect, adminProtect, deleteOrder) 

// Update to confirm payment has been made by a user
router.route('/update-as-paid/:id').put(protect, adminProtect, updateOrderAsPaid) 

// Update that payout has been done
router.route('/update-as-paid-out/:id').put(protect, adminProtect, updateAsPaidOut) 

export default router