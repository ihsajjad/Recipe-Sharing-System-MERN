import express from "express";
import { verifyToken } from "../middleware/varifyToken";
import Recipe from "../models/Recipes.model";
import { RecipeDataType } from "../shared/types";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const recipeData: RecipeDataType = { ...req.body, creatorEmail: req.email };

    new Recipe(recipeData).save();

    res.json({ message: "Recipe was added successfully" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
