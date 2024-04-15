import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const CheckAdmin = asyncHandler(async (req, res, next) => {
  const role = req.role;
  if (role !== "admin") {
    throw new Error("Not authorized, user not admin");
  }
  next();
});
export default CheckAdmin;
