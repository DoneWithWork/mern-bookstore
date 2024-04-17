import GenreModel from "../models/GenreModel.js";
import { matchedData } from "express-validator";

import asyncHandler from "express-async-handler";

export const AddGenre = asyncHandler(async (req, res) => {
  const { name, description, books } = matchedData(req);
  const genre = new GenreModel({
    name,
    description,
  });

  await genre.save();
  res.status(201).json({ message: "Genre added successfully", success: true });
});
export const UpdateGenre = asyncHandler(async (req, res) => {
  const { name, description } = matchedData(req);
  const id = req.params.id;
  const genre = await GenreModel.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );
  if (!genre) {
    return res.status(404).json({ message: "Genre not found", success: false });
  }
  res
    .status(200)
    .json({ message: "Successfully updatede genre", success: true });
});

export const GetOneGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const genre = await GenreModel.findById(id);
  if (!genre) {
    return res.status(404).json({ message: "Genre not found", success: false });
  }
  res.status(200).json({ genre: genre._doc, success: true });
});

export const GetAllGenres = asyncHandler(async (req, res) => {
  const genres = await GenreModel.find();
  const genresList = genres.map((genre) => genre._doc);
  res.status(200).json({ genres: genresList, success: true });
});
export const DeleteGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const genre = await GenreModel.findByIdAndDelete(id);
  if (!genre) {
    return res.status(404).json({ message: "Genre not found", success: false });
  }
  res
    .status(200)
    .json({ message: "Genre deleted successfully", success: true });
});
