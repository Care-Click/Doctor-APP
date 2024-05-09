import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";

// Define types for form values and component props
interface LoginFormValues {
  email: string;
  password: string;
  serverError: string;
}

// Login component
const Login = ({ setToken }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const signin = async (data) => {
    try {
      const { email, password } = data;

      const response = await axios.post(
        "http://localhost:3000/api/doctors/signin",
        { email, password }
      );
      const token = response.data.token;

      localStorage.setItem("token", token);
      setToken(token);
      navigate("/requests");
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError("serverError" as any, {
          type: "manual",
          message: error.response.data.error,
        });
      } else {
        setError("serverError" as any, {
          type: "manual",
          message: "Cannot connect to the server.",
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] min-h-screen">
      <div
        className="flex items-center justify-center bg-cover bg-no-repeat text-white"
        style={{
          backgroundImage: `url('/src/assets/images/Capture1.png')`,
          backgroundPosition: "center center",
          minHeight: "100vh",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          className="flex flex-col justify-center items-center h-full w-full bg-opacity-10 p-4"
          style={{
            backgroundImage:
              "linear-gradient(0.01deg, #1DBED3 -1%, rgba(10, 107, 158, 0.801566) 59.1%, rgba(52, 167, 81, 0) 301.87%)",
          }}
        >
          <h1 className="text-6xl font-bold">HOPE FOR HUMANITY</h1>
          <h1 className="text-4xl mt-4">Welcome to CareClick</h1>
        </div>
      </div>

      <div className="flex justify-center items-center bg-[#f6fff8]">
        <form
          className="w-[450px] mx-auto p-[30px] rounded-md shadow-2xl items-center   "
          onSubmit={handleSubmit(signin)}
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
              {...register("email", { required: "Email is required" })}
              className={`form-control block w-full px-3 py-2 mb-3 border border-gray-400 rounded-md ${
                errors.email && "border-red-500"
              }`}
              placeholder="ex: jon.smith@email.com"
              type="email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="text-gray-700 text-lg" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`form-control block w-full px-3 py-2 mb-3 border border-gray-400 rounded-md ${
                errors.password && "border-red-500"
              }`}
              placeholder="••••••••"
              type="password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="block w-full px-3 py-2 bg-[#1DBED3] hover:bg-blue-700 text-white font-semibold rounded focus:outline-none focus:shadow-outline "
          >
            SIGN IN
          </button>
          {errors.serverError && (
            <div className="text-red-500 text-sm mt-2">
              {errors.serverError.message}
            </div>
          )}
          <div className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/join-us" className="text-[#1DBED3] hover:text-blue-600">
              SIGN UP
            </Link>

            <Link
        to="/payment"
        className="bg-[#1DBED3] text-white py-2 px-4 tablet:px-3 rounded hover:bg-blue-600 flex items-center"
      >
       Subscribe <span className="ml-2">&rarr;</span>
      </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
