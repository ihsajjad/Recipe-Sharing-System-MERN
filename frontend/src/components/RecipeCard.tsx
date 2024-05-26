import { useNavigate } from "react-router-dom";
import { RecipeCardType } from "../../../backend/src/shared/types";

const RecipeCard = ({ recipe }: { recipe: RecipeCardType }) => {
  const navigate = useNavigate();

  const handleRedirectToSingleRecipe = (_id: string) => {
    navigate(`/all-recipes/${_id}`);
  };

  return (
    <div className="border border-[var(--secondary-color)] p-4 bg-[var(--secondary-bg)] rounded space-y-3 shadow-lg shadow-slate-300 max-w-[400px] hover:bg-[var(--primary-bg)]">
      <h3 className="text-xl font-bold text-[var(--secondary-color)]">
        {recipe.recipeName}
      </h3>
      <img
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        className="object-cover h-44 w-full rounded"
      />
      <div className="flex flex-col">
        <span>Country: {recipe.country}</span>
        <span>Creator: {recipe.creatorEmail}</span>
      </div>

      <button
        onClick={() => handleRedirectToSingleRecipe(recipe._id as string)}
        className="cursor-pointer text-white px-3 py-1 font-semibold rounded bg-[var(--secondary-color)] duration-300 opacity-90 hover:opacity-100 mx-auto w-full"
      >
        View The Recipe
      </button>
    </div>
  );
};

export default RecipeCard;
