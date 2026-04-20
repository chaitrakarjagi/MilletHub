import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/login.css";

export default function Signup(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    
    if (!email || !password || !name) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <>
    <div className="login-page-container">
      {/* Background Image Section */}
      <div className="login-bg-wrapper"></div>

      {/* Signup Form Card */}
      <div className="login-card-container">
        <div className="login-form-card">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-down">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join MilletHub today</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
              {error}
            </div>
          )}

          {/* Full Name Input */}
          <div className="mb-5 animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
            />
          </div>

          {/* Email Input */}
          <div className="mb-5 animate-fade-in-left" style={{ animationDelay: "0.15s" }}>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password (min. 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-gray-400"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-4 animate-fade-in-left shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ animationDelay: "0.3s" }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
