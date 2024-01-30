// Create a new file named `SpeechReader.js` inside the `src` directory
import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import question from './questions.json';

const SpeechReader = () => {
  const [textToSpeak, setTextToSpeak] = useState('');
  const [dataset, setDataset] = useState([]);

//   const handleTextChange = (event) => {
//     setTextToSpeak(event.target.value);
//   };

  const handleSpeakClick = (data) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = data;
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Select the desired voice
    utterance.rate = 1.0; // Adjust speech rate
    speechSynthesis.speak(utterance);
  };

//   const fetchDataset = async () => {
//     const response = await fetch('https://github.com/jdorfman/awesome-json-datasets');
//     // response = await fetch('questions.json');
//     const data = await response.json();
//     setDataset(data);
//     //.log(data);

//   };

async function delay_time() {
    // await delay(5000);
    console.log("This message will be logged after 3 seconds");
  }

  const handleReadFromDataset = () => {
     //fetchDataset();
    question.map(q => {
        for(let i=0; i<3; i++){
            // console.log(q.result[i].question);
            setTextToSpeak(q.result[i].question);
            var data = q.result[i].question;
            console.log(data);
            handleSpeakClick(data);
            //delay_time();
        }
       
    })
    //  .catch(error => console.log('error'))
    // const selectedText = dataset[Math.floor(Math.random() * dataset.length)].text;
   // const selectedText = dataset;
   // console.log(selectedText);
   // setTextToSpeak(selectedText);
    
  };

  return (
    <div>
      {/* <input type="text" value={textToSpeak} onChange={handleTextChange} />
      <button onClick={handleSpeakClick}>Speak</button> */}
      <button onClick={handleReadFromDataset}>Read from Dataset</button>
      {/* <ul>
        {dataset.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default SpeechReader;