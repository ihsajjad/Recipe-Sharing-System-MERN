import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";
import bgVideo from "/bg-video.mp4";

const HeroSection = () => {
  const { signInWithGoogle, user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleRedirect = async () => {
    if (!user) {
      signInWithGoogle("/add-recipes");
    } else {
      navigate("/add-recipes", { replace: true });
    }
  };

  return (
    <header className={`h-[calc(100vh-64px)] w-full border relative`}>
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute inset-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* header content */}
      <div className="bg-black/20 w-full h-full absolute z-[1] inset-0 flex items-center justify-center">
        <div className="w-5/6 md:w-2/3 text-center space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
            Discover, Cook, Share: Your Culinary Adventure Starts Here!
          </h1>
          <p className="text-gray-100">
            Join our community of passionate cooks and food lovers. Explore a
            world of delicious recipes, from everyday meals to gourmet delights.
            Share your own culinary creations and inspire others with your
            unique recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleRedirect}
              className="border-[2px] border-white/80 text-white px-4 py-2 font-bold text-xl rounded-full bg-[var(--primary-color)] duration-300 shadow-xl hover:shadow-[#ff634794] opacity-90 hover:opacity-100"
            >
              Share Your Recipe
            </button>
            <Link
              to="/recipes"
              className="hover:bg-slate-700 border-[2px] text-white/90 px-4 py-2 font-bold text-xl rounded-full hover:opacity-100 border-white duration-300 flex gap-2 items-center"
            >
              Explore Recipes <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
