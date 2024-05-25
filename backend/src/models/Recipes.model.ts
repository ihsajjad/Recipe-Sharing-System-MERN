import mongoose from "mongoose";
import { RecipeDataType } from "../shared/types";

const RecipeSchema = new mongoose.Schema<RecipeDataType>({
  recipeName: { type: String, required: true },
  recipeImage: { type: String, required: true },
  recipeDetails: { type: String, required: true },
  youtubeVideo: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  views: { type: Number, default: 0 },
  reacts: { type: Number, default: 0 },
  earnedCoins: { type: Number, default: 0 },
  purchased_by: [{ type: String }],
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
