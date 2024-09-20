import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import booksRoute from "./routes/booksRoutes.js";
import path from "path";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

//middleware for parsing request body

app.use(express.json());

//middleware for handling cors policy
// option 1 : -Allow all origins with the default of cors
app.use(cors());

const __dirname = path.resolve();

// option:-2 Allow custom origins

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.use("/books", booksRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
  connectDB();
  console.log("server is listenoing at http://localhost:" + PORT);
});
