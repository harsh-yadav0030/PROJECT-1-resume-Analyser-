/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../auth.form.scss";
import "../../../style/button.scss";
import { useNavigate,Link } from "react-router";
import "../auth.link.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {loading,handleLogin}=useAuth();//destructure useAuth;

  const [email,setEmail]=useState("");// for email
  const [password,setPassword]=useState("");// for password

  const navigate = useNavigate();
   
  const handleSubmit= async(e)=>{
      e.preventDefault();
      await handleLogin({email,password});
      console.log("after login");
      navigate("/");
  }
  if(loading){
    return (
      <main><h1>Loading............</h1></main>
    )
  };

  return (
    <main>
      <div className="form-container">
        <div className="logo-container">
          ✨
        </div>

        <h1>ResumeAI</h1>

        <div className="badge">
          AI-Powered Analysis
        </div>

        <p className="subtitle">
          Sign in to analyze and optimize your resume with AI
        </p>

        <form onSubmit={handleSubmit}>
  <div className="input-group">
    <label htmlFor="email">
      Email Address
    </label>

    <input
     onChange={(e)=>{
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
         onChange={(e)=>{
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
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>
  </div>
</div>

  <button
    type="submit"
    className="primary-button"
  >
    Login
  </button>
</form>

<p className="auth-link">
    Don't have an account? <Link to="/register">Register</Link>
</p>

<div className="footer">
  Trusted by job seekers worldwide
</div>
      </div>
    </main>
  );
};

export default Login;