import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("USER"); // USER | DRIVER
  const { setUser, user } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isSignup) {
        const response = await api.post("/user/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role,
        });
      } else {
        const response = await api.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });
      }

      await getUserProfileDetails();
    } catch (err) {
      setError(err?.response?.data?.errors || "Something went wrong");
    }
  };

  const getUserProfileDetails = async () => {
    const response = await api.get("/user/getUserProfile");
    setUser(response.data);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">
          {isSignup ? "Create your Uber account" : "Sign in to Uber"}
        </h2>

        {/* Role Switch */}
        {isSignup && (
          <div className="flex mb-6 bg-gray-200 rounded">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`w-1/2 py-2 rounded ${
                role === "USER" ? "bg-black text-white" : "text-gray-700"
              }`}
            >
              Rider
            </button>
            <button
              type="button"
              onClick={() => setRole("DRIVER")}
              className={`w-1/2 py-2 rounded ${
                role === "DRIVER" ? "bg-black text-white" : "text-gray-700"
              }`}
            >
              Driver
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name (optional)"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
          >
            {isSignup
              ? role === "DRIVER"
                ? "Sign up as Driver"
                : "Sign up"
              : "Continue"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "New to Uber?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="font-semibold underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
