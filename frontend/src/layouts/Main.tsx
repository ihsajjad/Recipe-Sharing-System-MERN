import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="max-w-screen-xl mx-auto bg-base-600">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
