import React, { useEffect, useRef } from "react";

function WebGazer() {
  window.saveDataAcrossSessions = true;

  const LOOK_DELAY = 100;
  const LEFT_CUTOFF = window.innerWidth / 4;
  const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

  const [messageVisible, setMessageVisible] = React.useState(false);

  let startLookTime = Number.POSITIVE_INFINITY;
  let lookDirection = null;
  let messageTimeout = null;
  let gazeListener = null;

  const webgazer = window.webgazer;
  
  const videoRef = useRef(null);

  const captureFrame = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log('canvas: ', canvas)
      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          console.log('Frmae: ', formData)
          formData.append('frame', blob, 'frame.jpg');
          fetch('/fer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the Content-Type header
            },
            body: formData,
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
            .then(data => {
              console.log('Emotion:', data.emotion);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }, 'image/jpeg');
    }
  };

  const datectEye = (text) => {
    fetch('/eye', {
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
        console.error(error);
    });
  }

  useEffect(() => {
    gazeListener = (data, timestamp) => {
      if (data == null) return;

      if (data.x < LEFT_CUTOFF && lookDirection !== 'LEFT') {
        startLookTime = timestamp;
        lookDirection = "LEFT";
      } else if (data.x > RIGHT_CUTOFF && lookDirection !== "RIGHT") {
        startLookTime = timestamp;
        lookDirection = "RIGHT";
      } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
        startLookTime = Number.POSITIVE_INFINITY;
        lookDirection = null;
      }

      if (startLookTime + LOOK_DELAY < timestamp) {
        if (lookDirection !== null) {
          setMessageVisible(true);
          datectEye(1);
          captureFrame();
          console.log('left');
        } else {
          setMessageVisible(false);
          datectEye(0);
        }
      }

      if (data.x < LEFT_CUTOFF || data.x > RIGHT_CUTOFF) {
        startLookTime = timestamp;
        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
          setMessageVisible(true);
          datectEye(1);
          captureFrame();
        }, LOOK_DELAY);
      } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
        clearTimeout(messageTimeout);
        setMessageVisible(false);
        datectEye(0);
      }
    };

    webgazer.setGazeListener(gazeListener).begin();

    return () => {
      webgazer.setGazeListener(null);
      gazeListener = null;
    };


  }, []);

  return (
    <div>
      {/* {messageVisible && <div><center>Look at the picture!</center></div>} */}
    </div>
  );
}

export default WebGazer;