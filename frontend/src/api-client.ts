import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
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
  import.meta.env.MODE === "production"
    ? ""
    : "https://recipe-sharing-9on8.onrender.com";

export const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// getting current user data
export const getCurrentUser = async (): Promise<UserDataType> => {
  const response = await instance.get("/api/users/current-user");
  return response.data;
};

//   user login
export const userLogin = async (userData: UserDataType) => {
  const response = await instance.post("/api/users", JSON.stringify(userData));
  return response.data;
};

// fetch single recipe
export const fetchSingleRecipeById = async (
  recipeId: string
): Promise<RecipeDataType> => {
  const response = await instance.get(`/api/recipes/${recipeId}`);
  return response.data;
};

// create new recipe
export const createNewRecipe = async (recipeData: RecipeDataType) => {
  const response = await instance.post("/api/recipes", recipeData);
  return response.data;
};

// get all recipes
export const getAllRecipes = async (
  queryParams: SearchQuery
): Promise<{ recipes: RecipeCardType[]; total: number }> => {
  const params = new URLSearchParams();
  params.append("searchText", queryParams.searchText);
  params.append("country", queryParams.country);
  params.append("category", queryParams.category);

  const response = await instance.get(`/api/recipes?${params}`);
  return response.data;
};

// create payment intent
export const createPaymentIntent = async (amount: number) => {
  const response = await instance.post("/api/users/create-payment-intent", {
    amount,
  });
  return response.data;
};

// increase coins
export const increaseCoins = async (paidAmount: number) => {
  const response = await instance.put("/api/users/increase-coins", {
    paidAmount,
  });
  return response.data;
};

// buy recipe
export const buyRecipe = async (recipeId: string, creatorEmail: string) => {
  const response = await instance.put("/api/recipes/buy-recipe", {
    recipeId,
    creatorEmail,
  });
  return response.status;
};

// update reaction
export const updateReactions = async (recipeId: string) => {
  const response = await instance.put("/api/recipes/reaction", { recipeId });
  return response.status;
};
