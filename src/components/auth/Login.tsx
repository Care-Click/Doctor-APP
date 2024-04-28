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
const Login = ({setToken}) => {
  // React Hook Form setup
  const { register, handleSubmit, setError, formState: { errors } } = useForm<
    LoginFormValues
  >();
  const navigate = useNavigate();
  const signin = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        "http://localhost:3000/api/doctors/signin",
        { email, password }
      );
      const token = response.data.token;

      localStorage.setItem("token", token)
      setToken(token)
      navigate("/requests")


    } catch (error) {
      console.log(error);
      
      if (error.response) {
        setError("serverError" as any, { type: "manual", message: error.response.data.error });
      } else {
        setError("serverError" as any, { type: "manual", message: "Cannot connect to the server." });
      }
    }
  };

  return (

    <div className="grid grid-cols-[1fr_2fr] ">
      <div
        className="opacity-90 shadow text-white flex items-center justify-center"
        style={{
          backgroundImage: `url('/src/assets/images/OIP.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
        }}
      >
        <div className="text-center  mb-20">
          <h1 className="text-6xl font-bold text-[#1DBED3]">HOPE FOR HUMANITY</h1>
          <p className="text-2xl mt-4 text-[#1DBED3]">Welcome</p>
        </div>
      </div>
      <div className="flex justify-center items-center bg-blue-100">
        <form
          className="w-[500px] mx-auto p-[50px] rounded-md shadow-lg bg-blue-200"
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
              className={`form-control block w-full px-3 py-2 mb-3 border border-gray-400 rounded-md ${errors.email && 'border-red-500'}`}
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
              className={`form-control block w-full px-3 py-2 mb-3 border border-gray-400 rounded-md ${errors.password && 'border-red-500'}`}
              placeholder="••••••••"
              type="password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 ml-40 rounded focus:outline-none focus:shadow-outline"
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

  );
};

export default Login;
