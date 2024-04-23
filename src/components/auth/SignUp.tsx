import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Handle the file upload logic with state as needed

  const handleSignUp = () => {
    // Sign up logic
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] ">
      <div
        className="opacity-90 shadow text-white"
        style={{
          backgroundImage: `url(/Capture.PNG)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-[#1DBED3] h-full bg-opacity-50 p-12">
          <h1 className="text-6xl font-bold">HOPE FOR HUMANITY</h1>
          <p className="text-2xl">Welcome to hope for humanity</p>
        </div>
      </div>
      <div className="bg-gray-100 p-8 min-h-screen flex justify-center items-center overflow-x-hidden">
  <form className="w-full max-w-2xl p-6 bg-white rounded-md shadow-lg overflow-hidden">
    <div className="flex flex-wrap -mx-3 mb-4">
      {/* First Name */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          First Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="text"
          placeholder="ex: John"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      {/* Last Name */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Last Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="text"
          placeholder="ex: Smith"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </div>
    
    <div className="flex flex-wrap -mx-3 mb-4">
      {/* Date of Birth */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Date of Birth
        </label>
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          type="date"
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      {/* Email */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          placeholder="ex: jon.smith@email.com"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-3 mb-4">
      {/* Password */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          placeholder="••••••••"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </div>
      {/* Confirm Password */}
      <div className="p-3 w-full md:w-1/2">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          placeholder="••••••••"
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-3 mt-4">
      <div className="w-full px-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            handleSignUp();
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
    <div className="text-center mt-4">
      <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
        Already have an account? SIGN IN
      </Link>
    </div>
  </form>
</div>
      </div>
    
  );
};

export default SignUp;
