import React, { useState } from "react";
import videoFile from './result_video.mp4';
import './Avatar.css';


function Avatar({url}) {

  // const [muted, setMuted] = useState(true);
  // const handleToggleMute = () => setMuted(current => !current);

  return(
    <div className="avatar">
      <video autoPlay muted={true} src={url} style={{width:"73vw", height:"73vh", marginBottom:"20px"}}>
        {/* <source src={url} type="video/mp4" /> */}
      </video>
      {/* <button onClick={handleToggleMute} className="unmute_button">
        {muted ? 'Unmute' : 'Mute'}
      </button> */}
    </div>
  );
};

export default Avatar;