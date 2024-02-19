import React, { useState } from "react";
import videoFile from './result_video.mp4';
import './Avatar.css';


function Avatar() {

  const [muted, setMuted] = useState(true);
  const handleToggleMute = () => setMuted(current => !current);

  return(
    
    <div className="avatar">
      
      <video autoPlay muted={muted}>
        <source src={videoFile} type="video/mp4" />
      </video>
      <button onClick={handleToggleMute} className="unmute_button">
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
};

export default Avatar;