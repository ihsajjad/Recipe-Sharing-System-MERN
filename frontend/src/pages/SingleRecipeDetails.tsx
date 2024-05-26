import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import EmbededVideo from "../components/EmbededVideo";

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

  return (
    <div className="bg-[var(--primary-bg)] pb-16 pt-3 md:pt-8">
      <div className="max-container space-y-5 ">
        <h3 className="text-3xl font-semibold mb-2">{recipe?.recipeName}</h3>
        <span className="border border-gray-500 text-sm bg-white text-gray-500 px-2 py-1 rounded-full">
          {recipe?.category}
        </span>
        <img
          src={recipe?.recipeImage}
          alt=""
          className="h-[90vh] w-full object-cover border-2 rounded"
        />
        <div className="flex items-center justify-between flex-wrap font-semibold">
          <span className="flex gap-1">
            <button>
              <ThumbsUp fill="var(--primary-color)" />
            </button>
            {recipe?.reacts}
          </span>
          <span className="flex gap-1"> Country: {recipe?.country}</span>
          <span className="flex gap-1">Creator: {recipe?.creatorEmail}</span>
        </div>
        <p className="text-slate-600 text-justify">
          <span className="font-semibold">Recipe Guideline : </span> <br />
          {recipe?.recipeDetails}
        </p>
        <EmbededVideo iframe={recipe?.youtubeVideo as string} />
      </div>
    </div>
  );
};

export default SingleRecipeDetails;
