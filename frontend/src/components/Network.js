import React, { useState, useEffect } from 'react';
import '../styles/Network.css';

const Network = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    // Fetch connections data from backend
    // This would be replaced with actual API call
    const mockConnections = [
      {
        id: 1,
        name: "Jane Developer",
        title: "Senior Software Engineer",
        company: "Tech Corp",
        avatar: "/avatars/jane.jpg"
      },
      {
        id: 2,
        name: "John Coder",
        title: "Full Stack Developer",
        company: "Dev Solutions",
        avatar: "/avatars/john.jpg"
      }
    ];
    setConnections(mockConnections);
  }, []);

  return (
    <div className="network-page">
      <h1>My Network</h1>
      
      <div className="connections-grid">
        {connections.map(connection => (
          <div key={connection.id} className="connection-card">
            <img src={connection.avatar} alt={connection.name} className="avatar" />
            <h3>{connection.name}</h3>
            <p>{connection.title}</p>
            <p className="company">{connection.company}</p>
            <button className="connect-btn">Message</button>
          </div>
        ))}
      </div>

      <div className="suggestions">
        <h2>People You May Know</h2>
        {/* Similar connection cards for suggestions */}
      </div>
    </div>
  );
};

export default Network;
