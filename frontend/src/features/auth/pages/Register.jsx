/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../auth.form.scss";
import "../../../style/button.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await handleRegister({username, email,password});
    navigate("/login");
  }
   catch (error) {
    console.log(error);
  }
};

  if (loading) {
    return (
      <main>
        <h1>Loading............</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <div className="logo-container">✨</div>
        <h1>ResumeAI</h1>
        <div className="badge">AI-Powered Analysis</div>
        <p className="subtitle">
          Sign Up to analyze and optimize your resume with AI
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>

            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              placeholder="Enter email address"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="primary-button">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="footer">Trusted by job seekers worldwide</div>
      </div>
    </main>
  );
};

export default Register;
