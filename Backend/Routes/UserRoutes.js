import express from 'express';
const router = express.Router();

import  {authUser,getUserProfile,registerUser,UpdateUserProfile}  from '../controller/UserControllers.js';
import {protect} from '../Middleware/authMiddleware.js'

router.route('/login').post(authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile);
router.route('/register').post(registerUser);

export default router;