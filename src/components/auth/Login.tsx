import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import '../../App.css'

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="overflow-x-hidden flex bg-gray-100">
    <div className="grid grid-cols-[1fr_2fr] ">
      <div
        className="h-screen opacity-90 shadow text-white " 
        style={{
          backgroundImage: `url(/Capture.PNG)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-[#1DBED3] h-full bg-opacity-50 p-12">
          <h1 className="text-6xl font-bold mb-4">HOPE FOR HUMANITY</h1>
          <p className="text-2xl">Welcome to hope for humanity</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[400px] mx-auto p-[30px] rounded-md shadow-lg">
          <h1 className="text-center text-3xl text-[#1DBED3] font-semibold mb-10">
            Sign in your account
          </h1>
          <div className="mb-6">
            <label className="text-gray-700 text-lg" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              className="form-control block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
              placeholder="ex: jon.smith@email.com"
              onChange={(event) => setUsername(event.target.value)}
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-700 text-lg" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-control block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
              placeholder="••••••••"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
          <button
            className="w-full bg-[#1DBED3] text-white p-3 rounded-md hover:bg-blue-600"
            onClick={() => login(username, password)}
          >
            SIGN IN
          </button>
          <div className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#1DBED3] hover:text-blue-600">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
