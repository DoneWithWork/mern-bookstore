import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import { matchedData, validationResult } from "express-validator";
const Register = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const { username, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });
  await user.save();
  res.status(201).json({ message: "User created", suceess: true });
});
const Login = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res
    .status(201)
    .cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ message: "User logged in", success: true });
});

const Update = asyncHandler(async (req, res) => {});
const Logout = asyncHandler(async (req, res) => {
  res
    .status(201)
    .clearCookie("authToken")
    .json({ message: "User logged out", success: true });
});

const DeleteUser = asyncHandler(async (req, res) => {});
export { Register, Login, Update, Logout };
