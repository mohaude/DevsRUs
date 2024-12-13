import React, { useState, useEffect } from 'react';
import '../styles/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: ''
  });

  useEffect(() => {
    // Fetch jobs data from backend
    // This would be replaced with actual API call
    const mockJobs = [
      {
        id: 1,
        title: "Senior React Developer",
        company: "Tech Solutions Inc",
        location: "Remote",
        salary: "$120k - $150k",
        description: "Looking for an experienced React developer...",
        requirements: ["5+ years React", "TypeScript", "Node.js"],
        type: "Full-time"
      },
      {
        id: 2,
        title: "Full Stack Engineer",
        company: "DevCorp",
        location: "New York, NY",
        salary: "$100k - $130k",
        description: "Join our growing team of developers...",
        requirements: ["3+ years experience", "React", "Python"],
        type: "Full-time"
      }
    ];
    setJobs(mockJobs);
  }, []);

  return (
    <div className="jobs-page">
      <div className="filters-section">
        <input 
          type="text" 
          placeholder="Search jobs..."
          className="search-input"
        />
        <select 
          value={filters.location} 
          onChange={(e) => setFilters({...filters, location: e.target.value})}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
        </select>
        {/* Add more filters as needed */}
      </div>

      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <p className="location">{job.location}</p>
            <p className="salary">{job.salary}</p>
            <p className="description">{job.description}</p>
            <div className="requirements">
              {job.requirements.map((req, index) => (
                <span key={index} className="requirement-tag">{req}</span>
              ))}
            </div>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
