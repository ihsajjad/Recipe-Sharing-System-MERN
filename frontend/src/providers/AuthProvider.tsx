import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { UserDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import { app } from "../firebase/firebase.config";

// create types for auth context
export type AuthContextType = {
  user: UserDataType | undefined;
  signInWithGoogle: () => Promise<UserCredential>;
  setUser: Dispatch<SetStateAction<UserDataType | undefined>>;
  logOut: () => Promise<void>;
};

// import app and create auth
const auth = getAuth(app);

// create auth context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDataType | undefined>(undefined);

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // logout user
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const observe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = localStorage.getItem("token");
        if (token) {
          // getting the user's data form the database
          const userData = await apiClient.getCurrentUser(token);
          setUser(userData);
        }
      } else {
        setUser(undefined);
      }
    });

    return () => observe();
  }, []);
  const authInfo = { user, signInWithGoogle, setUser, logOut };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
