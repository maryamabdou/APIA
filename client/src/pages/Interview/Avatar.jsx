import React, { useState } from "react";
import videoFile from './result_video.mp4';
import './Avatar.css';


function Avatar({url, imageUrl}) {

  // const [muted, setMuted] = useState(true);
  // const handleToggleMute = () => setMuted(current => !current);

  return(
    <div className="avatar">
      <video autoPlay muted={false} src={url} className="video-background"></video>
      <img src={imageUrl} alt="Background Image" className="image-overlay"/>
      {/* <button onClick={handleToggleMute} className="unmute_button">
        {muted ? 'Unmute' : 'Mute'}
      </button> */}
    </div>
  );
};

export default Avatar;