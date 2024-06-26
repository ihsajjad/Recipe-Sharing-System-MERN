import { AlignJustify } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";
import LogOutBtn from "./LogOutBtn";

const Navbar = () => {
  const { signInWithGoogle, user } = useContext(AuthContext) as AuthContextType;

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-recipes">Recipes</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/add-recipes">Add Recipes</Link>
          </li>
          <li className="md:hidden">
            <LogOutBtn />
          </li>
        </>
      ) : null}
    </>
  );

  const handleSignIn = async () => {
    signInWithGoogle("/");
  };

  return (
    <nav className="navbar bg-[var(--primary-color)] max-container">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-2 md:hidden">
            <AlignJustify />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="text-lg md:text-xl font-bold">FlavorCanvas</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="flex items-center gap-5 font-semibold text-slate-700 px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <>
            <Link
              to="/buy-coins"
              className="px-2 py-0.5 rounded-full bg-white text-sm"
            >
              Coins: {user?.coins ? user?.coins : 0}
            </Link>
            <img
              alt={user.displayName}
              src={
                user?.photoURL
                  ? user?.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              className="w-10 h-10 rounded-full overflow-hidden"
            />
            <LogOutBtn />
          </>
        ) : (
          <>
            <button
              onClick={handleSignIn}
              className="cursor-pointer font-semibold text-slate-700"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
