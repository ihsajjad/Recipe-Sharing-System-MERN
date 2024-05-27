import express, { Request, Response } from "express";
import { verifyToken } from "../middleware/varifyToken";
import Recipe from "../models/Recipes.model";
import User from "../models/User.model";
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

    const recipes = await Recipe.find(query)
      .skip(skip)
      .limit(pageSize)
      .select(
        "_id recipeName recipeImage country category creatorEmail purchased_by"
      );

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
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe)
      return res.status(404).json({ message: "Recipe doesn't exist!" });

    res.json(recipe);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

// purchase recipe
router.put("/buy-recipe", verifyToken, async (req: Request, res: Response) => {
  try {
    const { recipeId, creatorEmail } = req.body;

    // updating the recipe after user buy
    await Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $inc: { views: 1 }, $push: { purchased_by: req.email } }
    );

    // updating user info after user buy
    await User.findOneAndUpdate({ email: req.email }, { $inc: { coins: -10 } });
    await User.findOneAndUpdate(
      { email: creatorEmail },
      { $inc: { coins: 1 } }
    );

    res.json({ message: "Recipe was bought successfully" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// reaction
router.put("/reaction", verifyToken, async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.body;

    const user = await User.findOne({
      email: req.email,
      reactions: recipeId,
    });

    // if user already reacted delecting the reaction
    if (user) {
      await User.findOneAndUpdate(
        {
          email: req.email,
        },
        { $pull: { reactions: recipeId } }
      );

      await Recipe.findByIdAndUpdate(recipeId, { $inc: { reacts: -1 } });
    } else {
      // if user not reacted adding the reaction
      await User.findOneAndUpdate(
        {
          email: req.email,
        },
        { $push: { reactions: recipeId } }
      );

      await Recipe.findByIdAndUpdate(recipeId, { $inc: { reacts: 1 } });
    }

    res.json({ message: "Reaction was updated" });
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
    constructedQuery.category = queryParams.category;
  }

  if (queryParams.country) {
    constructedQuery.country = queryParams.country;
  }

  return constructedQuery;
}

export default router;
