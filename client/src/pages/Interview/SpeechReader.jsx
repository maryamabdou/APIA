import React, { useState , useEffect, useRef} from 'react';
import { Box, Stack } from "@mui/material";
import questions from './questions.json';
import Avatar from "./Avatar.jsx";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../../firebase';
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";

const SpeechReader = () => {
  const [firstQuest, setFirstQuest] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [quest, setQuest] = useState("");

  const totalQuestions =  questions.result.length;
  const index = useRef(0); // Initial random index
  
  const [videoUrl, setVideoUrl] = useState("")

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const getQuestionVideo = (videoId) => {
    var videosRef = databaseRef(database, "videos/" + videoId)
    console.log(videosRef)
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      const filename = data.filename;
      console.log(filename);
      const urlRef = storageRef(storage, "videos/" + filename);
      getDownloadURL(urlRef)
      .then((downloadURL) => {
        setVideoUrl(downloadURL)
        console.log("Video URL:", downloadURL);
      })
      .catch((error) => {
        console.error("Error getting video URL:", error);
      });
    });
  }

  // const handleSpeakClick = (text) => {
  //   const utterance = new SpeechSynthesisUtterance();
  //   utterance.text = text;
  //   utterance.voice = window.speechSynthesis.getVoices()[0]; // Select the desired voice
  //   utterance.rate = 1; // Adjust speech rate
  //   speechSynthesis.speak(utterance);
  //   sendTextToFlask(text);
  // };

  // const sendTextToFlask = (text) => {
  //   fetch('/uploadText', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // Set the Content-Type header
  //     },
  //     body: JSON.stringify({ text }),
  //   })
  //   .then(response => {
  //       // Handle response from Flask
  //   })
  //   .catch(error => {
  //       console.error('Error uploading text:', error);
  //   });
  // };

  const compareAnswer = (answer, transcript) => { 
    const text = []
    text.push(answer)
    text.push(transcript)
      fetch('/similarity', {
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
          console.error('Error uploading text:', error);
      });
  }

  const handleReadFromDataset = () => {
    SpeechRecognition.stopListening()
    //compare result before getting new question
    if(firstQuest){
      setFirstQuest(false)
    }
    else {
      const answer = questions.result[index.current].correct_answer;
      console.log("Correct: " + answer)
      console.log("Given: " + transcript)
      compareAnswer(answer, transcript)
      resetTranscript()
    }
    // new question
    const randomIndex = Math.floor(Math.random() * totalQuestions); // Random index for each question
      index.current = randomIndex;
      const data = questions.result[index.current].question;
      if(data){
        getQuestionVideo(index.current)
        setQuest(data);
        // handleSpeakClick(data);

        setTimeout(() => {
          SpeechRecognition.startListening({continuous: true})
          
        }, 10000); //get size q from vid avatar
      }
      else{
        //No more questions, notify the parent component
        // navigate to score page
      }
  };

  const startInterview = () => {
      var data = questions.result[0].question;
      getQuestionVideo(0)
      setQuest(data);
  
      setTimeout(() => {
        SpeechRecognition.startListening({continuous: true})
      }, 10000); //get size q from vid avatar
  };
  
 
  return (
    <div>
      <Stack direction="column" spacing={3}>
        <Box sx={{height: "75vh"}}>
          <Avatar url={videoUrl} />
        </Box>
        <Box sx={{height: "3vh"}}>
          <center><p>{quest}</p></center>
        </Box>
        <Stack direction="row" spacing={1}>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={startInterview}>start interview</button>
          <button onClick={handleReadFromDataset}>stop</button>
          <p>{transcript}</p>
        </Stack>
      </Stack>
    </div>
  );
};

export default SpeechReader;