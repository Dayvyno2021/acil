import express from "express";
import { allOrders, order, placeorder, singleOrder } from "../controllers/investmentController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/placeorder').post(protect, placeorder);

//fetches an individual order
router.route('/order/:id').get(protect, order);

//Fetches the orders of an investor
router.route('/myorders').get(protect, singleOrder) 

//Fetches all the orders for the admin
router.route('/all-orders').get(protect, adminProtect, allOrders) 

export default router