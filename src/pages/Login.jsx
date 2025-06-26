// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("authenticated", "true");
      setAuth(true);
      toast.success("Login successful!", {
        duration: 2000,
      });
      setTimeout(() => navigate("/generator"), 1500);
    } else {
      toast.error("Invalid credentials", {
        duration: 2500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Login</h2>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-semibold rounded-lg shadow-md hover:from-cyan-700 hover:to-cyan-500 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
