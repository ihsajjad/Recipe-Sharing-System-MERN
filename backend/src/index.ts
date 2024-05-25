import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const app = express();

// checking database connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB is connected"));

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Server is running...");
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
