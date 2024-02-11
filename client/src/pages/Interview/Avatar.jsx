/*import React, { useEffect, useRef } from "react";*/
import React from "react";
import videoFile from './result_video.mp4';
import './Avatar.css';
import { Player , BigPlayButton} from 'video-react';


function Avatar() {
/*  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.muted = false;
  }, []);*/
  

  return(
    
    <div className="avatar">
      <Player autoPlay loop fluid={false} disableDefaultControls disableFullscreen>
        <source src={videoFile} type="video/mp4" />
        <BigPlayButton/>
      </Player>

    </div>
  );
};

export default Avatar;