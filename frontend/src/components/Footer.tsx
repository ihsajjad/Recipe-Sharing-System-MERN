import { FacebookIcon, GitBranchPlus, LinkedinIcon, User } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 flex-col-reverse gap-2 sm:flex-row bg-[var(--primary-color)] text-white">
      <span>All &copy;2024 Copy rights for FalvorCanvas</span>
      <div className="flex gap-2">
        <Link to="/">
          <LinkedinIcon />
        </Link>
        <Link to="/">
          <FacebookIcon />
        </Link>
        <Link to="/">
          <GitBranchPlus />
        </Link>
        <a href="https://ih-sajjad.netlify.app" target="_blank">
          <User />
        </a>
      </div>
    </div>
  );
};

export default Footer;
