import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddRecipes from "../pages/AddRecipes";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-recipes", element: <AddRecipes /> },
    ],
  },
]);
