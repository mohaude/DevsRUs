import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    title: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    avatar: '/avatars/sarah.jpg',
    background: '/backgrounds/code.jpg',
    about: 'Passionate developer with 8+ years of experience in web technologies.',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mock data - would be replaced with API call
    const mockData = {
      experience: [
        {
          id: 1,
          company: 'Tech Giants Inc.',
          position: 'Senior Developer',
          duration: '2020 - Present',
          description: 'Leading development of cloud-based solutions.'
        }
      ],
      education: [
        {
          id: 1,
          school: 'Stanford University',
          degree: 'M.S. Computer Science',
          year: '2018'
        }
      ],
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'],
      projects: [
        {
          id: 1,
          name: 'AI Code Assistant',
          description: 'Built an AI-powered code completion tool',
          link: 'https://github.com/example'
        }
      ]
    };
    
    setProfile(prev => ({ ...prev, ...mockData }));
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="background-image">
          <img src={profile.background} alt="background" />
        </div>
        <div className="profile-info">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          <div className="profile-details">
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
            <p>{profile.location}</p>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit Profile
              </button>
            ) : (
              <button onClick={() => setIsEditing(false)} className="save-button">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <section className="about-section">
          <h3>About</h3>
          {isEditing ? (
            <textarea
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            />
          ) : (
            <p>{profile.about}</p>
          )}
        </section>

        <section className="experience-section">
          <h3>Experience</h3>
          {profile.experience.map(exp => (
            <div key={exp.id} className="experience-item">
              <h4>{exp.position}</h4>
              <h5>{exp.company}</h5>
              <p>{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="education-section">
          <h3>Education</h3>
          {profile.education.map(edu => (
            <div key={edu.id} className="education-item">
              <h4>{edu.school}</h4>
              <p>{edu.degree}</p>
              <p>{edu.year}</p>
            </div>
          ))}
        </section>

        <section className="skills-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="projects-section">
          <h3>Projects</h3>
          {profile.projects.map(project => (
            <div key={project.id} className="project-item">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Profile;
