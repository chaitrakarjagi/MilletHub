import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <div className="p-4">
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} className="border p-2 block mb-2"/>
      <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} className="border p-2 block mb-2"/>
      <button className="bg-black text-white px-4 py-2" onClick={()=>login(email,password)}>Login</button>
    </div>
  );
}
