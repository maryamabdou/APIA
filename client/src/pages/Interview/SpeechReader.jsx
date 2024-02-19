import React, { useState , useEffect} from 'react';
import { Box, Stack } from "@mui/material";
import questions from './questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const SpeechReader = () => {
  const [listening, setListening] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [start_interview, setInterview] = useState(true);
  const [quest, setQuest] = useState("")
 
  const totalQuestions =  questions.result.length;
  const [index, setIndex] = useState(Math.floor(Math.random() * totalQuestions)); // Initial random index
  
  const handleUserSpeech = (speech) => {
    setUserResponses(prevResponses => [...prevResponses, speech]); // Store user's speech
  };

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({continuous: true});
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening]);
  

  useEffect(() => {
    if (transcript !== '') {
      handleUserSpeech(transcript); // Pass user's speech to parent component
      // resetTranscript(); // Reset transcript after passing the speech
    }
  }, [transcript, handleUserSpeech]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSpeakClick = (text) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Select the desired voice
    utterance.rate = 1.0; // Adjust speech rate
    speechSynthesis.speak(utterance);
  };

  const handleReadFromDataset = () => {
    setListening(false);
      const data = questions.result[index].question;
      const randomIndex = Math.floor(Math.random() * totalQuestions); // Random index for each question
      if(data){
        setQuest(data);
        handleSpeakClick(data);

        setTimeout(() => {
          setListening(true);
          // SpeechRecognition.startListening({continuous: true});
          
          setIndex(randomIndex);
        }, 10000); //get size q from vid avatar
      }
      else{
        //No more questions, notify the parent component
        // navigate to score page
      }
  };

  const startInterview = () => {
    console.log(totalQuestions)
    if(start_interview){
      var data = questions.result[0].question;
      setQuest(data);
      handleSpeakClick(data);
  
      setTimeout(() => {
        setListening(true);
      }, 10000); //get size q from vid avatar
      setInterview(false);
    }
  } ;
  
 
  return (
    <div>
      <Stack direction="column" spacing={3}>
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