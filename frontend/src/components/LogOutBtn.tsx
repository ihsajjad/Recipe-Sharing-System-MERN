import { useContext } from "react";
import { successToast } from "../lib/utils";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const LogOutBtn = () => {
  const { setUser, logOut } = useContext(AuthContext) as AuthContextType;

  const handleLogout = () => {
    logOut().then(() => {
      successToast("Logout successfull");
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
