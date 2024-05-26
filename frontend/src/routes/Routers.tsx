import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddRecipes from "../pages/AddRecipes";
import AllRecipes from "../pages/AllRecipes";
import Home from "../pages/Home";
import SingleRecipeDetails from "../pages/SingleRecipeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-recipes", element: <AddRecipes /> },
      { path: "/all-recipes", element: <AllRecipes /> },
      { path: "/all-recipes/:recipeId", element: <SingleRecipeDetails /> },
    ],
  },
]);
