import { useEffect, useState } from "react";
import { RecipeCardType, SearchQuery } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import CardSkeleton from "../components/CardSkeleton";
import RecipeCard from "../components/RecipeCard";
import SearchQueries from "../components/SearchQueries";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    category: "",
    country: "",
    searchText: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const result = await apiClient.getAllRecipes(searchQuery as SearchQuery);
      setRecipes(result.recipes);
      setLoading(false);
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className="max-container py-6">
      <h1 className="page-title">All Recipes</h1>
      <SearchQueries setSearchQuery={setSearchQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-16 justify-items-center sm:justify-items-stretch">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : recipes ? (
          recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe._id} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl font-bold text-[var(--primary-color)]">
              Recipes not found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
