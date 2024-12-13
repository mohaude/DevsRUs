import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Devs R Us</h1>
        <p>Connect with developers, find teams, and explore job opportunities</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
