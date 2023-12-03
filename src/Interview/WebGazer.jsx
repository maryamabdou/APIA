import React, { useEffect } from "react";
import "./WebGazer.css";

function WebGazer() {
  
  window.saveDataAcrossSessions = true

  const LOOK_DELAY = 3000
  const LEFT_CUTOFF = window.innerWidth / 4
  const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

  let startLookTime = Number.POSITIVE_INFINITY 
  let lookDirection = null


  function displayWarning(message) {
    // Create a new element to display the warning message.
    const warningElement = document.createElement("div");

    // Set the text content of the new element.
    warningElement.textContent = message;

    // Add a CSS class to the new element to style it as a warning message.
    warningElement.classList.add("warning");

    // Append the new element to the body of the webpage.
    document.body.appendChild(warningElement);
  }

  const webgazer = window.webgazer
  webgazer.setGazeListener((data, timestamp) => {
    if(data == null) return

    if (data.x < LEFT_CUTOFF && lookDirection != 'LEFT'){
      startLookTime = timestamp
      lookDirection = "LEFT"
    } 
    else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT"){
      startLookTime = timestamp
      lookDirection = "RIGHT"
    } 
    else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF){
      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = null
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
      //   imageElement.classList.add("left")
      alert('This is an alert!');
      } else {
      //   imageElement.classList.add("right")
      alert('This is an alert!');
      }
      // console.log("here")
    }

  }).begin();

  return(
    <div class = "img">
      <img src = "https://img.freepik.com/free-photo/business-job-interview-concept_1421-77.jpg?w=900&t=st=1698335011~exp=1698335611~hmac=6378f07665023493e93dd628968956c7f7853a76f1115b862c62dfca671d90ae"/>
    </div>
  );

};

export default WebGazer;

