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
  validateAuthorInput,
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
  validateAuthorInput(),
  validateAuthor,
  CheckAuth,
  CheckAdmin,
  AddAuthor
);
AuthorRouter.get("/getauthors", GetAuthors); //get all authors
AuthorRouter.get("/author/:id", GetAuthor); //get individual author
AuthorRouter.post(
  "/author/:id/update",
  validateAuthorInput(),
  validateAuthor,
  CheckAuth,
  CheckAdmin,
  UpdateAuthor
);
AuthorRouter.post("/author/:id/delete");

export default AuthorRouter;
