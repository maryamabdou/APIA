import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/Navbar.jsx";
import WebGazer from './WebGazer';
// import SpeechReader from "./SpeechReader";
import Avatar from "./Avatar.jsx";
import SpeechToText from "./SpeechToText.jsx"

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

        <Box sx={{ height: "75vh"}}>
          <Avatar />
        </Box>

        <Box sx={{ backgroundColor: "white", height: "6vh"}}>
          {/* <SpeechReader /> */}
        </Box>

        <Box sx={{ backgroundColor: "white", height: "5vh"}}>
          <SpeechToText />
        </Box>
      </Stack>
    </div>
  );
};

export default Interview;

