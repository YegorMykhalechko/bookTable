import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import corsOptions from "./config/cors.js";
import connectDB from "./config/database.js";
import credentials from "./middleware/credentials.js";
import errorHandlerMiddleware from "./middleware/error_handler.js";
import { authRouter } from "./routes/api/auth.js";

const __dirname = path.resolve();
const app = express();
const PORT = 3500;

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(errorHandlerMiddleware);

app.use("/api/auth", authRouter);
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("DB Conected");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
