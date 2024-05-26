import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeCardType } from "../../../backend/src/shared/types";
import { askingForPermission } from "../lib/utils";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const RecipeCard = ({ recipe }: { recipe: RecipeCardType }) => {
  const { signInWithGoogle, user } = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();

  const handleRedirectToSingleRecipe = (_id: string) => {
    // If user desn't exist asking for login
    if (!user) {
      return askingForPermission(
        "You aren't logged in.",
        "Do you want to log in?",
        "Yes, Login"
      ).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          signInWithGoogle(`/all-recipes/${_id}`);
        }
      });
    }

    // if the user is the creator of the recipe
    if (user?.email === recipe.creatorEmail) {
      return navigate(`/all-recipes/${_id}`);
    }

    // if user has already bought the recipe
    if (recipe.purchased_by?.includes(user.email)) {
      return navigate(`/all-recipes/${_id}`);
    }

    // if the user has less than 10 coins
    if (user?.coins && user?.coins < 10) {
      return askingForPermission(
        "You don't have enough coins",
        "Do you want to by coins?",
        "Buy Coins"
      ).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          navigate(`/buy-coins`);
        }
      });
    }

    // if the user has enough coins
    if (user?.coins && user?.coins > 10) {
      return askingForPermission(
        "You will be charged 10 coins.",
        "Do you want to visit the recipe?",
        "Yes, I want"
      ).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          // todo: cut 10 coins from the user
          navigate(`/all-recipes/${_id}`);
        }
      });
    }
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
