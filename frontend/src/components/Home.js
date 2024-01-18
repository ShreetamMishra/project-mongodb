import React from 'react';
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
function Home() {
  return (
    <div>
        <Navbar />
    <div className="lander">
      <h1 className='font-bold text-[20px]'>Project</h1>
      <p className="typewriter">Previous year quistion are available in this Site</p>
      
      <div className="btn-container">
        <Link to="/login" className="btn btn-info">
          Login
        </Link>
        <Link to="/register" className="btn btn-success">
          Signup
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Home;
