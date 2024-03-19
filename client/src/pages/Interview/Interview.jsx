import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/Navbar.jsx";
import WebGazer from './WebGazer';
import SpeechReader from "./SpeechReader";

function Interview() {
  const[visible,setvisible]=useState(true);

  return(
    <div>
      <Stack direction="column" spacing={1}>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav" style={{ boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)' }}>
              <div className="container px-4 px-lg-5">
                  <a className="navbar-brand" href="/" style={{color: 'black'}}>Sign out</a>
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                      <ul className="navbar-nav ms-auto my-2 my-lg-0">
                      <a className="navbar-brand" href="/firstpage" style={{color: '#f4623a'}}>End</a>
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

