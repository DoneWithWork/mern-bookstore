import express from "express";
import { body } from "express-validator";
import CheckAuth from "../middleware/auth.middleware.js";
import UserModel from "../models/UserModel.js";
import { Register, Login, Logout } from "../controllers/user.controller.js";
import ValidateErrors from "../middleware/validateErrors.middleware.js";
import bcrypt from "bcrypt";
const UserRouter = express.Router();

UserRouter.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .escape()
      .isEmail()
      .withMessage("Email is not valid")
      .custom(async (value) => {
        const duplicateEmail = await UserModel.findOne({ email: value });
        if (duplicateEmail) {
          throw new Error("Email already exists");
        }
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty()
      .escape(),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .escape()
      .notEmpty(),
  ],
  ValidateErrors,
  Register
);
UserRouter.post(
  "/login",
  [
    body("password")
      .isLength({ min: 6 })
      .notEmpty()
      .escape()
      .withMessage("Password must be at least 6 characters long")
      .custom(async (value, { req }) => {
        // Added { req } here
        const user = await UserModel.findOne({ username: req.body.username });
        if (!user) {
          throw new Error("User not found");
        }
        const passwordMatch = await bcrypt.compare(value, user.password);
        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }
        req.userId = user._id;
        console.log("password is correct");
      }),
    body("username")
      .isLength({ min: 3 })
      .escape()
      .notEmpty()
      .withMessage("Username must be at least 3 characters long"),
  ],
  ValidateErrors,
  Login
);
UserRouter.get("/logout", Logout);
UserRouter.post("/delete");
UserRouter.post("/update");
export default UserRouter;
