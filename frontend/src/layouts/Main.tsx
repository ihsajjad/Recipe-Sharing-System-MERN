import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="max-w-screen-xl mx-auto bg-base-600">
      <Navbar />
      <div className="min-h-[calc(100vh-95px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
