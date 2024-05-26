import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import recipeRoutes from "./routes/recipes.routes";
import userRoutes from "./routes/user.routes";

const port = process.env.PORT || 3000;
const app = express();

// checking database connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB is connected"));

// middleware
app.use(express.json());
app.use(cors());

// Starting the client
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// default route
app.get("/", (_, res) => {
  res.send("Server is running...");
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
