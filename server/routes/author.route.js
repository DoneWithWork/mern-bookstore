import express from "express";
import AuthorModel from "../models/AuthorModel.js";
import { body } from "express-validator";
import CheckAdmin from "../middleware/admin.middleware.js";
import CheckAuth from "../middleware/auth.middleware.js";
import {
  AddAuthor,
  GetAuthor,
  GetAuthors,
  UpdateAuthor,
} from "../controllers/author.controller.js";
const AuthorRouter = express.Router();

const validateAuthorInput = (req, res, next) => {
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
    body("date_of_death").notEmpty().isDate();
  next();
};
AuthorRouter.post(
  "/addauthor",

  validateAuthorInput(),
  CheckAuth,
  CheckAdmin,
  AddAuthor
);
AuthorRouter.get("/getauthors", GetAuthors); //get all authors
AuthorRouter.get("/author/:id", GetAuthor); //get individual author
AuthorRouter.post(
  "/author/:id/update",
  validateAuthorInput(),
  CheckAuth,
  CheckAdmin,
  UpdateAuthor
);
AuthorRouter.post("/author/:id/delete");

export default AuthorRouter;
