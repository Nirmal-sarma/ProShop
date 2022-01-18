import express from "express";
const router = express.Router();

import {
  AddOrderItems,
  getOrderById,
  UpdateOrderToPaid,
  getMyOrder,
} from "../controller/orderControllers.js";
import { protect } from "../Middleware/authMiddleware.js";

router.route("/").post(protect, AddOrderItems);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, UpdateOrderToPaid);

export default router;
