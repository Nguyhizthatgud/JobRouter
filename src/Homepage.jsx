import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ jobs }) => {
  const navigate = useNavigate();
  const handleBrowseJobs = () => {
    navigate("/jobs");
  };
  return (
    <div className="page">
      <div className="hero-section">
        <h1>Welcome to JobRouter</h1>
        <p>Find your dream job with our comprehensive job routing platform</p>
        <p>Jobs on loaded: {jobs ? jobs.length : 0} jobs</p>
        <button className="cta-button" onClick={handleBrowseJobs}>
          Browse Jobs
        </button>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>🎯 Targeted Search</h3>
          <p>Find jobs that match your skills and preferences</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast Application</h3>
          <p>Apply to multiple jobs with just a few clicks</p>
        </div>
        <div className="feature-card">
          <h3>📊 Track Progress</h3>
          <p>Monitor your application status and progress</p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
