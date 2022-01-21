import expressAsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../Utils/generateToken.js";

//@ description user auth & get Token
//@route POST  api/users/login
//@ access Public

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @ descriptio user auth & get Token
// @route POST  api/users/profile
//@ access private

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
      res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
     
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@ descriptio user auth & get Token
//@route POST  api/users/register
//@ access Public

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name,email, password } = req.body;
  const userExists = await User.findOne({ email });
  
 if(userExists){
   res.status(400)
   throw new Error('User Alreadry Exists');
 }

  const user=await User.create({
  name,
  email,
  password
  })

  if(user){

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }else{
    throw new Error('Invalid Data');
  }
  
});

// @ descriptio user auth & get Token
// @route PUT  api/users/update
//@ access private


export const UpdateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    if(req.body.password){
     user.password=req.body.password
    }
    const updateUser=await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id)
    });
  
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});