import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddRecipes from "../pages/AddRecipes";
import AllRecipes from "../pages/AllRecipes";
import BuyCoins from "../pages/BuyCoins";
import GenerateQR from "../pages/GenerateQR";
import Home from "../pages/Home";
import PaymentSummary from "../pages/PaymentSummary";
import SingleRecipeDetails from "../pages/SingleRecipeDetails";
import ViewFile from "../pages/ViewFile";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:filePath", element: <ViewFile /> },
      {
        path: "/add-recipes",
        element: (
          <PrivateRoute>
            <AddRecipes />
          </PrivateRoute>
        ),
      },
      { path: "/all-recipes", element: <AllRecipes /> },
      {
        path: "/all-recipes/:recipeId",
        element: (
          <PrivateRoute>
            <SingleRecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/buy-coins",
        element: (
          <PrivateRoute>
            <BuyCoins />
          </PrivateRoute>
        ),
      },
      {
        path: "/confirm-payment",
        element: (
          <PrivateRoute>
            <PaymentSummary />
          </PrivateRoute>
        ),
      },
      {
        path: "/generate",
        element: <GenerateQR />,
      },
    ],
  },
]);
