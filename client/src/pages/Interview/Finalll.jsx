import React, { useState , useEffect} from 'react';
import questions from './questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';


const Finalll = () => {
  const [listening, setListening] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [start_interview, setInterview] = useState(true);

  const [index, setIndex] = useState(0);
  const { speak } = useSpeechSynthesis();
  
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
    questions.map(q => {
      var data = q.result[index].question;
      if(q != ''){
        console.log(data);
        handleSpeakClick(data);

        setTimeout(() => {
          setListening(true);
          // SpeechRecognition.startListening({continuous: true});
          setIndex(index + 1);
        }, 10000); //get size q from vid avatar
      }
      else{
        //No more questions, notify the parent component
        // navigate to score page
      }
    }) 
  };

  const startInterview = () => {
    if(start_interview){
      questions.map(q => {
        var data = q.result[index].question;
        console.log(data);
        handleSpeakClick(data);
    
        setTimeout(() => {
          setListening(true);
          setIndex(index + 1);
        }, 10000); //get size q from vid avatar
      })
      setInterview(false);
    }
  } ;
  
 
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startInterview}>start interview</button>
      <button onClick={handleReadFromDataset}>stop</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Finalll;