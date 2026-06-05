/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import "../home.scss";

const Home = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <main className="home">
      
      {/* Navbar */}
      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">✨</span>
            <span>ResumeAI</span>
          </div>

          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Left Section */}
        <div className="left-panel">
          <h2>Job Description</h2>

          <textarea placeholder="Enter job description..." />
        </div>

        {/* Right Section */}
        <div className="right-panel">
          <div className="input-group">
            <label>Upload Resume</label>

            <input type="file" accept=".pdf" />
          </div>

          <div className="input-group">
            <label>Self Description</label>

            <textarea placeholder="Describe yourself in a few sentences..." />
          </div>

          <button className="primary-button">Generate Interview Report</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
