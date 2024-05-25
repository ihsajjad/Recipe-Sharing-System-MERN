export type UserDataType = {
  _id?: string;
  displayName: string;
  email: string;
  photoURL: string;
  coins?: number;
};

export type RecipeDataType = {
  _id?: string;
  creatorEmail?: string;
  purchased_by?: string[];
  earnedCoins?: number;
  reacts?: number;
  views?: number;
  recipeName: string;
  recipeImage: string;
  recipeDetails: string;
  youtubeVideo: string;
  country: string;
  category: string;
};
