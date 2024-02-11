import React from "react";
import videoFile from './result_video.mp4'; // Import your video file


function Avatar() {
  return(
    <div>
      <center>
        <video width="600" height="400" controls>
        <source src={videoFile} type="video/mp4" />
      </video>
      </center>
    </div>
  );
};

export default Avatar;

