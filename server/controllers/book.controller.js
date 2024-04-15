import BookModel from "../models/BookModel.js";

import asyncHandler from "express-async-handler";

import { matchedData, validationResult } from "express-validator";
import CommentModel from "../models/CommentsModel.js";
export const AddBook = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const {
    title,
    description,
    excerpt,
    publishedDate,
    author, //will be an id of author
    pages,
    genres,

    publisher,
  } = data;
  const book = new BookModel({
    title,
    description,
    excerpt,
    publishedDate,
    author,
    pages,
    genres,

    publisher,
  });
  await book.save();
  res.status(201).json({ message: "Book added successfully", success: true });
});
export const GetBooks = asyncHandler(async (req, res) => {
  const books = await BookModel.find();
  res.status(200).json({ books: books._doc, success: true });
});
export const GetBook = asyncHandler(async (req, res) => {
  const id = req.id;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found", success: false });
  }
  res.status(200).json({ book: book._doc, success: true });
});
export const UpdateBook = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const {
    title,
    description,
    excerpt,
    publishedDate,
    author,
    pages,
    genres,
    image,
    publisher,
  } = data;
  const id = req.id;
  const book = await BookModel.findByIdAndUpdate(id, data, { new: true });
  if (!book) {
    return res
      .status(404)
      .json({ message: "Error saving book", success: false });
  }
  res.status(200).json({ book: book._doc, success: true });
});

export const DeleteBook = asyncHandler(async (req, res) => {
  const id = req.id;
  const book = await BookModel.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found", success: false });
  }
  res.status(200).json({ message: "Book deleted successfully", success: true });
});

// export const AddComment = asyncHandler(async (req, res) => {
//   const data = matchedData(req);
//   const { content } = data;
//   const id = req.id;
//   const book = await BookModel.findById(id);
//   if (!book) {
//     return res.status(404).json({ message: "Book not found", success: false });
//   }

//   const userId = req.userId;
//   const newcomment = new CommentModel({
//     userId,
//     content,
//   });
//   book.comments.push(newcomment._id);
//   await Promise.all([newcomment.save(), book.save()]);
//   res
//     .status(201)
//     .json({ message: "Comment added successfully", success: true });
// });

// export const DeleteComment = asyncHandler(async (req, res) => {
//   //find which book, remove it
// });
