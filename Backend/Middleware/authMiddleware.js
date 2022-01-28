import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_TOKEN);

      req.user = await User.findById(decoded.id).select("-password");
      // console.log(req.user);
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  }
  next();
});

export const admin=(req,res,next)=>{
  if(req.user && req.user.isAdmin){
    next();
  }else{
    res.status(401);
    throw new Error('Not authorised as Admin');
  }
}
