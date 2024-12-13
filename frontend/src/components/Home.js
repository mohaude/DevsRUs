import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to DevsRUs</h1>
        <p>The professional network for developers and CS majors</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Connect</h3>
          <p>Network with other developers and CS professionals</p>
        </div>
        <div className="feature-card">
          <h3>Jobs</h3>
          <p>Find your next developer role</p>
        </div>
        <div className="feature-card">
          <h3>Chat</h3>
          <p>Collaborate and communicate with peers</p>
        </div>
      </section>

      <section className="cta">
        <h2>Join the Community</h2>
        <button className="signup-btn">Get Started</button>
      </section>
    </div>
  );
};

export default Home;
