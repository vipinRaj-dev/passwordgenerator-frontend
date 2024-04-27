import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/PortDetails";

const Signup = () => {
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
    console.log(email, password);

    axios
      .post(`${base_url}/auth/signup`, {
        email,
        password,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          //error message
          setError("Email already exists");
        } else if (error.response.status === 404) {
          setError("Email and password are required");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
        </div>
        <div className="text-red-500 font-semibold flex justify-center">
          {error}
        </div>
        <div className="space-y-4">
          <input
            ref={emailref}
            type="email"
            id="email-address"
            name="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />

          <input
            ref={passwordref}
            type="password"
            id="password"
            name="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
        <div>
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
