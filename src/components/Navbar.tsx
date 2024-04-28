import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="  bg-white shadow-lg p-2 flex justify-between items-center fixed w-full z-10">
      <div className="flex items-center px-2">
        <img src="src\assets\images\logo.png" alt="Logo" className="h-12 w-auto" />

        <span className="font-bold text-[#F26268] text-lg tablet:text-xl laptop:text-2xl ml-2">
          CareClick
        </span>
      </div>

      <div className="flex gap-4">
        <Link
          to="/"
          className="text-[#1DBED3] hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-[#1DBED3] hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300"
        >
          Login
        </Link>
        <Link
          to="/contact"
          className="text-[#1DBED3] hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300"
        >
          Contact
        </Link>
      </div>

      <Link
        to="/join-us"
        className="bg-[#1DBED3] text-white py-2 px-4 tablet:px-3 rounded hover:bg-blue-600 flex items-center"
      >
        Join Us <span className="ml-2">&rarr;</span>
      </Link>
    </nav>
  );
};

export default Navbar;
