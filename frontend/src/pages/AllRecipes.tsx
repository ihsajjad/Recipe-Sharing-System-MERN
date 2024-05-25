import { useEffect, useState } from "react";
import { RecipeCardType, SearchQuery } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";

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
      All Recipes
      <div>
        {recipes.map((recipe) => (
          <div>{recipe.recipeName}</div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
