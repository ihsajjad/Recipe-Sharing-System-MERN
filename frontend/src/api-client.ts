import { UserDataType } from "../../backend/src/shared/types";

const API_BASE_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3000";

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
