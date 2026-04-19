import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(!email || !password || !name){
      setError("All fields required");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch(err) {
      setError(err.response?.data?.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <input 
        placeholder="Full Name" 
        onChange={e=>setName(e.target.value)} 
        className="border p-2 block mb-2 w-full"
      />
      <input 
        placeholder="Email" 
        onChange={e=>setEmail(e.target.value)} 
        className="border p-2 block mb-2 w-full"
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={e=>setPassword(e.target.value)} 
        className="border p-2 block mb-4 w-full"
      />
      <button 
        onClick={handleRegister}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 w-full hover:bg-green-700"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      
      <p className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-blue-600 underline">Login here</a>
      </p>
    </div>
  );
}
