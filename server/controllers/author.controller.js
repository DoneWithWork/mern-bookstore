import AuthorModel from "../models/AuthorModel.js";

import asyncHandler from "express-async-handler";

import { matchedData, validationResult } from "express-validator";

/**
 * @description Add an author
 * @body name, description, date_of_birth, date_of_death
 */
export const AddAuthor = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const { name, description, date_of_birth, date_of_death } = data;

  const author = new AuthorModel({
    name,
    description,
    date_of_birth,
    date_of_death,
  });
  console.log(author);
  await author.save();
  res.status(201).json({ message: "Author added successfully", success: true });
});
export const GetAuthors = asyncHandler(async (req, res) => {
  const authors = await AuthorModel.find();
  const authorsList = authors.map((author) => author._doc);
  res.status(200).json({ authors: authorsList, success: true });
});

/**
 * @description Get a single author
 * @params id
 *
 */
export const GetAuthor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const author = await AuthorModel.findById(id);

  console.log("hi");
  console.log(id);
  console.log(author);
  if (!author) {
    return res
      .status(404)
      .json({ message: "Author not found", success: false });
  }
  res.status(200).json({ author, success: true });
});

/**
 * @description Update an author
 * @params id
 * @body name, description, date_of_birth, date_of_death
 */
export const UpdateAuthor = asyncHandler(async (req, res) => {
  const data = matchedData(req);
  const { name, description, date_of_birth, date_of_death } = data;
  const id = req.params.id;
  const author = await AuthorModel.findByIdAndUpdate(id, data, { new: true });
  if (!author) {
    return res
      .status(404)
      .json({ message: "Author not found", success: false });
  }
  res
    .status(200)
    .json({ message: "Author updated successfully", success: true });
});

/**
 * @description Delete an author
 * @params id
 *
 */
export const DeleteAuthor = asyncHandler(async (req, res) => {
  const id = req.id;
  const author = await AuthorModel.findById(id);

  if (!author) {
    return res
      .status(404)
      .json({ message: "Author not found", success: false });
  }
  if (author.books.length > 0) {
    return res
      .status(400)
      .json({ message: "Author has books, cannot delete", success: false });
  } else {
    await AuthorModel.findByIdAndDelete(id);
  }
  res
    .status(200)
    .json({ message: "Author deleted successfully", success: true });
});
