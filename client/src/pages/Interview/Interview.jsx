import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/Navbar.jsx";
import WebGazer from './WebGazer';
import SpeechReader from "./SpeechReader";
import Avatar from "./Avatar.jsx";

function Interview() {
  
  return(
    <div>
      <Stack direction="column" spacing={1}>
        <Box sx={{ height: "7vh"}}>
          <Navbar />
        </Box>

        <Box sx={{ height: "3vh"}}>
          {/* <WebGazer /> */}
        </Box>

        <Box sx={{ height: "73vh"}}>
          <Avatar />
        </Box>

        <Box sx={{ backgroundColor: "white", height: "12vh" }}>
          <SpeechReader />
        </Box>
      </Stack>
    </div>
  );
};

export default Interview;

