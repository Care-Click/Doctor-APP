import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
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
  const [payment_id, setId] = useState("");
  const verify = async () => {
    try {
      const subtoken=localStorage.getItem("subtoken")
      const response = await axios.get(
        `http://localhost:3000/api/payments/${payment_id}`,{headers:{"token":subtoken}}
      );
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };
  useEffect(() => {
    var urlParams = window.location.href;
    if (urlParams.indexOf("payment_id")!==-1) {
      setId(urlParams.slice(41, urlParams.length));
      verify()
    }
   
  }, [payment_id]);
  const [showModal, setShowModal] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

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
      if (error.response.status === 403) {
        setShowModal(!showModal);
      }

      if (error.response.status === 405) {
        localStorage.setItem("subtoken", error.response.data.subtoken);
        setSubscribe(!subscribe);
      }

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
          </div>
        </form>
      </div>
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      verification error
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      this account is not verified yet please wait until an
                      admin verify's you
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(!showModal);
                        console.log(showModal);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>

      {subscribe && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Subscription Required
                  </h3>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    You need to subscribe to access this service. Please proceed
                    to payment.
                  </p>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setSubscribe(false)}
                  >
                    Close
                  </button>
                  <Link
                    to="/payment"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Subscribe Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Login;
