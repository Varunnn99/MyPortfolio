import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // <-- Navigation Hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Login failed!");
    }
  };

  return (
    <section className="contact--section">
      <h2>Login</h2>
      <form className="contact--form--container" onSubmit={handleLogin}>
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
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Login
        </button>
        <p>Don't have an account? <a href="/register">Register here</a></p>

      </form>
    </section>
  );
};

export default Login;
