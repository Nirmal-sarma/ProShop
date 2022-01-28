import express from "express";
const router = express.Router();

import {
  AddOrderItems,
  getOrderById,
  UpdateOrderToPaid,
  getMyOrder,
  getOrder,
  UpdateOrderToDelivered
} from "../controller/orderControllers.js";
import { protect,admin } from "../Middleware/authMiddleware.js";

router.route("/").post(protect, AddOrderItems).get(protect,admin,getOrder);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, UpdateOrderToPaid);
router.route("/:id/deliver").put(protect,UpdateOrderToDelivered);

export default router;
