import express from 'express';
const router = express.Router();

import {getProduct,getProductById,deleteProductById,UpdateProduct,createProduct} from '../controller/productController.js'
import { protect, admin } from "../Middleware/authMiddleware.js";

router.route('/').get(getProduct).post(protect,admin,createProduct);
router.route('/:id').get(getProductById).delete(protect,admin,deleteProductById).put(protect,admin,UpdateProduct);

export default router;