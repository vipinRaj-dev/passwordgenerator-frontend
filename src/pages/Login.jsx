import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../utils/PortDetails";

const Login = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  useEffect(() => {
    const token = Cookies.get("jwttoken");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleSubmit = () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    axios
      .post(
        `${base_url}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          setError("Email and password are required");
        } else if (error.response.status === 404) {
          setError("No user found");
        } else if (error.response.status === 401) {
          setError("Incorrect password");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login In to your account
          </h2>
        </div>
        <div className="text-red-500 font-semibold flex justify-center">
          {error}
        </div>
        <div className="space-y-6">
          <input
            ref={emailref}
            type="email"
            className=" rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
            placeholder="Email address"
          />

          <input
            ref={passwordref}
            type="password"
            className=" rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md "
            placeholder="Password"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
          >
            Sign in
          </button>
        </div>
        <div>
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
