import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate(); // Navigation Hook

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role,
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! Please login.");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <section className="contact--section">
      <h2>Register</h2>
      <form className="contact--form--container" onSubmit={handleRegister}>
        <div className="container">
          <label className="contact--label">
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              className="contact--input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="contact--label">
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              className="contact--input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className="contact--label">
            Role:
            <select
              className="contact--input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
