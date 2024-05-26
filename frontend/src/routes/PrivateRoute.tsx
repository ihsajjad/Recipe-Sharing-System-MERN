import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center">
        <span className="loading loading-infinity w-[100px] text-[var(--primary-color)]" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
