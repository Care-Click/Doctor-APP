import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const info = { email, password };
      const { status, data } = await axios.post(
        "http://localhost:3000/api/doctors/signin",
        info
      );
      //console.log (data)
      const { token, loggedUser } = data;

      localStorage.setItem("token", token); // Store the token

      console.log("Logged in user:", loggedUser);
      navigate("/request");
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.error || "An error occurred during login"
        );
      } else {
        setErrorMessage(
          "Cannot connect to the server. Please try again later."
        );
      }
    }
  };

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
          <form
            className="w-[400px] mx-auto p-[30px] rounded-md shadow-lg"
            onSubmit={handleLogin}
          >
            <h1 className="text-center text-3xl text-[#1DBED3] font-semibold mb-10">
              Sign in your account
            </h1>
            <div className="mb-6">
              <label className="text-gray-700 text-lg" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-control block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
                placeholder="ex: jon.smith@email.com"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
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
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1DBED3] text-white p-3 rounded-md hover:bg-blue-600"
            >
              SIGN IN
            </button>
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">
                {errorMessage}
              </div>
            )}
            <div className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/join-us"
                className="text-[#1DBED3] hover:text-blue-600"
              >
                SIGN UP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
