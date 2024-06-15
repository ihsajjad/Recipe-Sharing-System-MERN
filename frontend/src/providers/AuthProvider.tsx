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
import { successToast } from "../lib/utils";

// create types for auth context
export type AuthContextType = {
  user: UserDataType | undefined;
  signInWithGoogle: (redirectURL: string) => void;
  setUser: Dispatch<SetStateAction<UserDataType | undefined>>;
  logOut: () => Promise<void>;
  setRefetchUser: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

// import app and create auth
const auth = getAuth(app);

// create auth context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const [refetchUser, setRefetchUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // sign in with google
  const signInWithGoogle = async (redirectURL?: string) => {
    await signInWithPopup(auth, googleProvider)
      .then(async (result: UserCredential) => {
        const { displayName, email, photoURL } = result.user;

        const userData = {
          displayName: displayName || "",
          email: email || "",
          photoURL: photoURL || "",
        };

        // will get the token form backend
        const data = await apiClient.userLogin(userData);

        // storing the token in the localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // redirecting the user to his destination
        // window.location.href = redirectURL || "/";
        successToast("User login successfull");
      })
      .catch(() => {});
  };

  // logout user
  const logOut = () => {
    return signOut(auth);
  };

  // observing the current user
  useEffect(() => {
    const observe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const token = localStorage.getItem("token");
        if (token) {
          // getting the user's data form the database
          const userData = await apiClient.getCurrentUser(token);
          setUser(userData);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setUser(undefined);
      }
    });

    return () => observe();
  }, [refetchUser]);

  const authInfo = {
    user,
    signInWithGoogle,
    setUser,
    logOut,
    setRefetchUser,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
