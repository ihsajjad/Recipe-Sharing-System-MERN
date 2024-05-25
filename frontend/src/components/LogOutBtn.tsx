import { useContext } from "react";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const LogOutBtn = () => {
  const { setUser, logOut } = useContext(AuthContext) as AuthContextType;

  const handleLogout = () => {
    logOut().then(() => {
      console.log("Logout Successfull");
      setUser(undefined);
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-slate-100 px-2 py-1 rounded-full text-sm text-slate-700 font-semibold border border-slate-700 hidden lg:block"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
