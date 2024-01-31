import React from "react";
import './NavBar.css';
import logo from '../assets/images/logo.png';
import NavButton from './NavButton';

function Navbar() {
  
  return(
    <div className = "NavBar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="title">
          <h1>APIA</h1>
        </div>
      </div>
      
      <div className="content">
        <NavButton label="Stop" onClick={() => console.log('Button clicked!')} />
      </div>
    </div>
  );
};

export default Navbar;

