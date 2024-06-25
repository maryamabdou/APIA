import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/Navbar.jsx";
import WebGazer from './WebGazer';
import SpeechReader from "./SpeechReader";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function Interview() {
  const [visible, setVisible] = useState(true);

  const location = useLocation();
  const username = new URLSearchParams(location.search).get('email');
  const navigate = useNavigate();
  console.log("hiiii");
  console.log(username);

  const handleClick = () => {
    fetch('/end', {
      // method: 'POST',
      // headers: {
      // 'Content-Type': 'application/json', // Set the Content-Type header
      // },
      // body: JSON.stringify({ text }),
    })
    .then(response => {
        // Handle response from Flask
    })
    .catch(error => {
        console.error(error);
    });

    navigate("/firstpage", { state: { username: username } });
  };

  const signOut = () => {
    const text = 1
    fetch('/signout', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json', // Set the Content-Type header
      },
      body: JSON.stringify({ text }),
    })
    .then(response => {
        // Handle response from Flask
    })
    .catch(error => {
        console.error('Error uploading text:', error);
    });
  }

  return(
    <div>
      <Stack direction="column" spacing={1}>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav" style={{ boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)' }}>
              <div className="container px-4 px-lg-5">
                  <a className="navbar-brand" href="/" onClick={signOut} style={{color: 'black'}}>Sign out</a>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                      <ul className="navbar-nav ms-auto my-2 my-lg-0">
                      <a className="navbar-brand" href="/firstpage" onClick={handleClick} style={{color: '#2F8BDB'}}>End</a>
                     {/*<a href={`/firstpage?username=${encodeURIComponent(sharedVariable)}`} style={{color: '#f4623a'}}>End</a>*/}
                          {/* <li className="nav-item"><a className="nav-link" href="#about">History</a></li>
                          <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                          <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li> */}
                      </ul>
                  </div>
              </div>
          </nav>

          <SpeechReader />

        {/* <Box sx={{ height: "3vh"}}>
          <WebGazer />
        </Box> */}
      </Stack>
    </div>
  );
};

export default Interview;

