import { useEffect, useState } from "react";
import { RecipeCardType, SearchQuery } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import RecipeCard from "../components/RecipeCard";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    category: "",
    country: "",
    searchText: "",
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await apiClient.getAllRecipes(searchQuery as SearchQuery);
      setRecipes(result.recipes);
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-[var(--primary-color)] my-4">
        All Recipes
      </h1>
      <div className="max-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-16 justify-items-center sm:justify-items-stretch">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;