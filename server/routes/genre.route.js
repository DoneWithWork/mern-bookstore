import express from "express";
import {
  genreValidationRules,
  validateGenre,
} from "../validators/genre.validation";
import CheckAdmin from "../middleware/admin.middleware.js";
import CheckAuth from "../middleware/auth.middleware.js";
import {
  AddGenre,
  UpdateGenre,
  GetOneGenre,
  GetAllGenres,
  DeleteGenre,
} from "../controllers/genre.controller.js";
const GenreRouter = express.Router();

GenreRouter.post(
  "/addgenre",
  CheckAuth,
  CheckAdmin,
  genreValidationRules(),
  validateGenre,
  AddGenre
);
GenreRouter.post("/:id", GetOneGenre);
GenreRouter.get("/getallgenres", GetAllGenres);
GenreRouter.post(
  "/:id/update",
  CheckAuth,
  CheckAdmin,
  genreValidationRules(),
  validateGenre,
  UpdateGenre
);
GenreRouter.post("/:id/delete", CheckAuth, CheckAdmin, DeleteGenre);

export default GenreRouter;
