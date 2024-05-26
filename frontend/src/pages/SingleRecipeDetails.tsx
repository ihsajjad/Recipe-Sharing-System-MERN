import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";

const SingleRecipeDetails = () => {
  const [recipe, setRecipe] = useState<RecipeDataType>();
  const { recipeId } = useParams();

  useEffect(() => {
    const loadRecipe = async () => {
      const data = await apiClient.fetchSingleRecipeById(recipeId as string);
      setRecipe(data);
    };

    recipeId && loadRecipe();
  }, [recipeId]);

  console.log(recipeId, recipe);
  return <div>{recipe?.recipeName}</div>;
};

export default SingleRecipeDetails;
