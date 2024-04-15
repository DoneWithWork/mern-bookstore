import express from "express";
import { body } from "express-validator";
import BookModel from "../models/BookModel.js";
import CheckAdmin from "../middleware/admin.middleware.js";
import CheckAuth from "../middleware/auth.middleware.js";
import { AddBook, GetBook, GetBooks } from "../controllers/book.controller.js";
const BookRouter = express.Router();
const validateBookInput = () => [
  body("title")
    .notEmpty()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .custom(async (value) => {
      const book = await BookModel.findOne({ title: value });
      if (book) {
        throw new Error("Book already exists");
      }
    }),
  body("description")
    .notEmpty()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("excerpt").notEmpty().escape(),
  body("publishedDate").notEmpty().isDate(),
  body("author").notEmpty().escape(),
  body("pages").notEmpty().isNumeric(),
  body("genres").notEmpty().escape(),
  body("publisher").notEmpty().escape(),
];
BookRouter.post(
  "/addbook",

  validateBookInput(),
  CheckAuth,
  CheckAdmin,
  AddBook
);
BookRouter.get("/getbooks"); //get all books
BookRouter.get("/book/:id"); //get individual book
BookRouter.post("/book/:id/update");
BookRouter.post("/book/:id/delete");

// BookRouter.post("/comment/addcomment");
// BookRouter.post("/comment/:id/delete");
export default BookRouter;
//need to verify author id
