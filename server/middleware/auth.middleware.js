import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";
const CheckAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    throw new Error("Not authorized, no token");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    throw new Error("Not authorized, invalid token");
  }
  const userId = decodedToken.userId;
  if (!userId) {
    throw new Error("Not authorized, userId not present");
  }
  const user = await UserModel.findById(userId).lean().exec();
  if (!user) {
    throw new Error("Not authorized, user not found");
  }
  req.role = user.role;
  req.userId = user._id;

  console.log("all good");
  next();
});

export default CheckAuth;
