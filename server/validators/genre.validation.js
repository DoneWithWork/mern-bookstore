import { body, validationResult } from "express-validator";
import GenreModel from "../models/GenreModel.js";

const genreValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .custom(async (value) => {
        const genre = await GenreModel.findOne({ name: value });
        if (genre) {
          throw new Error("Genre already exists");
        }
      }),
    body("description")
      .notEmpty()
      .escape()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters long"),
    body("books").optional(),
  ];
};
const validateGenre = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};
export { genreValidationRules, validateGenre };
