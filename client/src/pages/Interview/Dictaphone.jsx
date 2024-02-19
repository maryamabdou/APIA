import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Dictaphone({ listening, onUserSpeech }) {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening]);

  useEffect(() => {
    if (transcript !== '') {
      onUserSpeech(transcript); // Pass user's speech to parent component
      resetTranscript(); // Reset transcript after passing the speech
    }
  }, [transcript, resetTranscript, onUserSpeech]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening()}>Start</button>

      <button onClick={() => resetTranscript()}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}

export default Dictaphone;
