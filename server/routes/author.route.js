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
import {
  authorValidationRules,
  validateAuthor,
} from "../validators/author.validation.js";

/**
 * @description Add an author
 * @body name, description, date_of_birth, date_of_death
 * @middleware CheckAuth, CheckAdmin
 * @POST /author/addauthor
 */
AuthorRouter.post(
  "/addauthor",
  authorValidationRules(),
  validateAuthor,
  CheckAuth,
  CheckAdmin,
  AddAuthor
);
AuthorRouter.get("/getauthors", GetAuthors); //get all authors
AuthorRouter.get("/:id", GetAuthor); //get individual author
AuthorRouter.post(
  "/:id/update",
  authorValidationRules(),
  validateAuthor,
  CheckAuth,
  CheckAdmin,
  UpdateAuthor
);
AuthorRouter.post(
  "/:id/delete",

  CheckAuth,
  CheckAdmin
);

export default AuthorRouter;
