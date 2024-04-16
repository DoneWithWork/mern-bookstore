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
    body("date_of_birth")
      .notEmpty()
      .isISO8601()
      .withMessage("Date of birth must be in ISO format (YYYY-MM-DD)"),
    body("date_of_death")
      .optional()
      .isISO8601()
      .withMessage("Date of death must be in ISO format (YYYY-MM-DD)"),
  ];
};

const validateAuthor = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};
export { authorValidationRules, validateAuthor };
