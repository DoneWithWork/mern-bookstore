import mongoose from "mongoose";
const AuthorSchema = new mongoose.Schema(
  {
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
    date_of_birth: {
      type: Date,
      required: true,
    },
    date_of_death: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const AuthorModel = mongoose.model("Author", AuthorSchema);
export default AuthorModel;
