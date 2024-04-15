import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const ValidateErrors = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    res.status(400).json({ errors: result.array() }); // Sending errors as JSON
    return;
  }
  console.log("no errors");
  next();
});

export default ValidateErrors;
