import express from "express";
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  UpdateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  UpdateUser,
} from "../controller/UserControllers.js";
import { protect, admin } from "../Middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, UpdateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUserById)
  .put(protect, admin, UpdateUser);

export default router;
