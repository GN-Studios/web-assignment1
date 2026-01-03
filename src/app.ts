import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import postRoutes from "./routes/post.routes";

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb://${process.env.MONGODB_HOST || "localhost:27017"}/${
    process.env.MONGODB_DB || "assignment-1"
  }`,
  {} as ConnectOptions
);

const DB = mongoose.connection;
DB.on("error", (error) => {
  console.error("connection error:", error);
});
DB.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/post", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
