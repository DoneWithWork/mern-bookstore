import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
const GenreModel = mongoose.model("Genre", GenreSchema);
export default GenreModel;
