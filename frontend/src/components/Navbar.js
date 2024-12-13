import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Devs R Us</a>
        <ul className="right">
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/teams">Teams</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/chat">Chat</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
