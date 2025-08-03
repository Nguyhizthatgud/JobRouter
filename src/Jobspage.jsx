import React, { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { notification } from "antd";
import Stack from "@mui/material/Stack";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import jobList from "./joblist";

const JobsPage = ({ isLogin }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState(1);

  let jobsPerPage = 6;

  // Filter jobs based on search parameter
  const filteredJobs = useMemo(() => {
    const searchValue = searchParams.get("search");
    if (!searchValue) {
      return jobList;
    }

    return jobList.filter((job) => job.title.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchParams]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (pagination - 1) * jobsPerPage;
  const jobsToDisplay = filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  useEffect(() => {
    setPagination(1);
  }, [searchParams]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: `Login Required Bruh?`,
      description: `Đăng nhập trước rồi xem gì thì xem nhé anh.`,
      placement: "topRight"
    });
  };
  const handlePageChange = (event, page) => {
    setPagination(page);
  };

  return (
    <div className="page">
      {contextHolder}
      <div className="title">
        <p>Available Jobs</p>
        {searchParams.get("search") && (
          <p>
            Matching {filteredJobs.length} results for "{searchParams.get("search")}"
          </p>
        )}
        <Stack className="pagination" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={pagination}
            onChange={handlePageChange}
            shape="rounded"
            color="secondary"
            sx={{ margin: "0 auto" }}
          />
        </Stack>
      </div>
      <div className="jobs-grid">
        {jobsToDisplay && jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="company">Company ID: {job.companyId}</p>
              <p className="location">📍 {job.city}</p>
              <p className="salary">
                💰 ${job.salaryLow.toLocaleString()} - ${job.salaryHigh.toLocaleString()}
              </p>
              <p className="type">🕒 {job.yrsXPExpected} years experience</p>
              <p className="remote">{job.remote ? "🌐 Remote" : "🏢 On-site"}</p>
              <button
                className="view-details-btn"
                onClick={() => {
                  if (isLogin) {
                    navigate(`/jobs/${job.id}`);
                  } else {
                    openNotification();
                  }
                }}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div>
            {searchParams.get("search") ? (
              <div>
                <p>No jobs found matching "{searchParams.get("search")}"</p>
                <button
                  onClick={() => navigate("/jobs")}
                  style={{
                    padding: "8px 16px",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Show All Jobs
                </button>
              </div>
            ) : (
              <p>No jobs available or loading...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
