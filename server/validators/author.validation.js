import { body, validationResult } from "express-validator";
import AuthorModel from "../models/AuthorModel.js";
const authorValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .custom(async (value) => {
        const author = await AuthorModel.findOne({ name: value });
        if (author) {
          throw new Error("Author already exists");
        }
      }),
    body("description")
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters long"),
    body("date_of_birth").notEmpty().isDate(),
    body("date_of_death").notEmpty().isDate(),
  ];
};

const validateAuthor = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
export { authorValidationRules, validateAuthor };
