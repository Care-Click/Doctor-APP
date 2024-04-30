import React from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

const LoggedNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-2 flex justify-between items-center ">
      <div className="flex items-center px-2">
        <img src="src\assets\images\logo.png" alt="Logo" className="h-12 w-auto" />
        <span className="font-bold text-[#F26268] text-lg tablet:text-xl laptop:text-2xl ml-2">
          CareClick
        </span>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <Link
          to="/"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Home
        </Link>
        <Link
          to="/patients"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Patients
        </Link>
        <Link
          to="/Requests"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Requests
        </Link>

        <Link
          to="/messages"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Messages
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[rgba(242,98,104,0.75)] text-white py-2 px-4 tablet:px-3 rounded hover:bg-[#F26268] flex items-center"
      >
        Logout <span className="ml-2">&rarr;</span>
      </button>
    </nav>
  );
};

export default LoggedNavbar;
