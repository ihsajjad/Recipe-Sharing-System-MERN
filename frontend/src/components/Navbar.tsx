import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import { AlignJustify } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const Navbar = () => {
  const { signInWithGoogle, user, setUser } = useContext(
    AuthContext
  ) as AuthContextType;

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
            <button className="cursor-pointer bg-slate-100 px-2 py-0.5 md:py-1 rounded-full text-sm text-slate-700 font-semibold border border-slate-700 w-fit my-1 ml-2">
              Logout
            </button>
          </li>
        </>
      ) : null}
    </>
  );

  const handleSignIn = async () => {
    await signInWithGoogle()
      .then((result: UserCredential) => {
        const { displayName, email, photoURL } = result.user;
        const userData = {
          displayName,
          email,
          photoURL,
        };
        console.log(user);
      })
      .catch((err: FirebaseError) => console.log(err));
  };

  return (
    <div className="navbar bg-[var(--primary-color)] max-container ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-2 md:hidden">
            <AlignJustify />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
            <div className="px-2 py-0.5 rounded-full bg-white text-sm">
              Coins: {user?.coins ? user?.coins : 0}
            </div>
            <img
              alt="Tailwind CSS Navbar component"
              src={
                user?.photoURL
                  ? user?.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              className="w-10 h-10 rounded-full overflow-hidden"
            />
            <button className="cursor-pointer bg-slate-100 px-2 py-1 rounded-full text-sm text-slate-700 font-semibold border border-slate-700 hidden lg:block">
              Logout
            </button>
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
    </div>
  );
};

export default Navbar;
