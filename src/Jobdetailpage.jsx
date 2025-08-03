import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobList from "./joblist";
import "./styles/pages/JobDetailPage.css";

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the job by ID from the job list
  const selectedJob = jobList.find((job) => job.id.toString() === id);

  const handleBackClick = () => {
    navigate("/jobs");
  };

  // If job not found, show error message
  if (!selectedJob) {
    return (
      <div className="page">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Jobs
        </button>
        <div className="job-detail">
          <h1>Job Not Found</h1>
          <p>The job you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={handleBackClick}>
        ← Back to Jobs
      </button>
      <div className="job-detail">
        <h1>{selectedJob.title}</h1>
        <div className="job-info">
          <p>
            <strong>Company ID:</strong> {selectedJob.companyId}
          </p>
          <p>
            <strong>Location:</strong> {selectedJob.city}
          </p>
          <p>
            <strong>Salary:</strong> ${selectedJob.salaryLow.toLocaleString()} - $
            {selectedJob.salaryHigh.toLocaleString()}
          </p>
          <p>
            <strong>Experience Required:</strong> {selectedJob.yrsXPExpected} years
          </p>
          <p>
            <strong>Work Type:</strong> {selectedJob.remote ? "Remote" : "On-site"}
          </p>
          <p>
            <strong>Status:</strong> {selectedJob.active ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Posted Date:</strong> {new Date(selectedJob.postedDate).toLocaleDateString()}
          </p>
        </div>
        <div className="job-description">
          <h3>Description</h3>
          <p>{selectedJob.description}</p>
        </div>
        <div className="job-requirements">
          <h3>Required Skills</h3>
          <ul>
            {selectedJob.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetailPage;
