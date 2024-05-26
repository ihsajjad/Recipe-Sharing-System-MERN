import express, { Request, Response } from "express";
import { verifyToken } from "../middleware/varifyToken";
import Recipe from "../models/Recipes.model";
import { RecipeDataType } from "../shared/types";

const router = express.Router();

// get all recipes
router.get("/", async (req: Request, res: Response) => {
  try {
    // preparing the query
    const query = await constructedSearchQuery(req.query);

    // total recipes
    const total = await Recipe.countDocuments(query);

    const pageSize = 10;

    let pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

    if (total <= pageSize) pageNumber = 1;

    const skip = (pageNumber - 1) * pageSize;

    const recipes = await Recipe.find(query).skip(skip).limit(pageSize);

    const response = {
      recipes,
      total,
    };

    res.json({ ...response });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single recipe by _id
router.get("/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    if (!recipe) return res.status(404).json({ message: "Recipe doesn't exist!" })
    
    res.json(recipe)
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({message: "Internal server error"})
  }
})

// add new recipe
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const recipeData: RecipeDataType = { ...req.body, creatorEmail: req.email };

    new Recipe(recipeData).save();

    res.json({ message: "Recipe was added successfully" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function constructedSearchQuery(queryParams: any) {
  const constructedQuery: any = {};

  if (queryParams.searchText) {
    constructedQuery.$or = [
      { recipeName: new RegExp(queryParams.searchText, "i") },
      { recipeDetails: new RegExp(queryParams.searchText, "i") },
    ];
  }

  if (queryParams.category) {
    constructedQuery.$eq = { category: queryParams.category };
  }

  if (queryParams.country) {
    constructedQuery.$eq = { country: queryParams.country };
  }

  return constructedQuery;
}

export default router;
