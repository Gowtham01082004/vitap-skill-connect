import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext"; // 👈 Import this
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin(); // 👈 Use context here

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = loginAdmin(email, password); // 👈 Save status
    if (isValid) {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
