import mongoose from "mongoose";
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    pages: {
      type: Number,
      required: true,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],

    image: {
      type: Buffer,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;
