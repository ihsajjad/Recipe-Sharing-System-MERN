import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { app } from "../firebase/firebase.config";

// create types for auth context
export type AuthContextType = {
  user: UserDataType | undefined;
  signInWithGoogle: () => Promise<UserCredential>;
  setUser: Dispatch<SetStateAction<UserDataType | undefined>>;
};

// user data type
type UserDataType = {
  name: string;
  photoURL: string;
  email: string;
  coins: number;
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

  const authInfo = { user, signInWithGoogle, setUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
