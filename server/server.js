import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import CookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import AuthorRouter from "./routes/author.route.js";
import GenreRouter from "./routes/genre.route.js";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/user", UserRouter);
app.use("/author", AuthorRouter);
app.use("/genre", GenreRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
