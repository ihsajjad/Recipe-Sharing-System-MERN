import { loadStripe } from "@stripe/stripe-js";
import {
  RecipeCardType,
  RecipeDataType,
  SearchQuery,
  UserDataType,
} from "../../backend/src/shared/types";

// load stripe promise
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

export const API_BASE_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3000";

export const token = localStorage.getItem("token");

// getting current user data
export const getCurrentUser = async (token: string): Promise<UserDataType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/current-user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

//   user login
export const userLogin = async (userData: UserDataType) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) return new Error("Something went wrong");

  return response.json();
};

// fetch single recipe
export const fetchSingleRecipeById = async (
  recipeId: string
): Promise<RecipeDataType> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}`);

  if (!response.ok) throw new Error("Something went wrong");

  return response.json();
};

// create new recipe
export const createNewRecipe = async (
  recipeData: RecipeDataType,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) throw new Error("Something went wrong");

  return response.json();
};

// get all recipes
export const getAllRecipes = async (
  queryParams: SearchQuery
): Promise<{ recipes: RecipeCardType[]; total: number }> => {
  const params = new URLSearchParams();
  params.append("searchText", queryParams.searchText);
  params.append("country", queryParams.country);
  params.append("category", queryParams.category);

  const response = await fetch(`${API_BASE_URL}/api/recipes?${params}`);

  if (!response.ok) throw new Error("Something went wrong!");

  return response.json();
};

// create payment intent
export const createPaymentIntent = async (amount: number, token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    }
  );

  if (!response.ok) throw new Error("Something went wrong");

  return response.json();
};

// increase coins
export const increaseCoins = async (paidAmount: number) => {
  const response = await fetch(`${API_BASE_URL}/api/users/increase-coins`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ paidAmount }),
  });

  if (!response.ok) throw new Error("Something went wrong");

  return response.json();
};

// buy recipe
export const buyRecipe = async (recipeId: string, creatorEmail: string) => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/buy-recipe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ recipeId, creatorEmail }),
  });

  if (!response.ok) throw new Error("Something went wrong");

  return response.ok;
};
