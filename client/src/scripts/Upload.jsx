import React, { useState , useEffect} from 'react';
import { Box, Stack } from "@mui/material";
// import questions from '../pages/Interview/questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../firebase';
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";
import Papa from "papaparse";

const Upload = () => {
    // const [question, setQuestion]= useState([]);
    let question = [];
    let answer = [];

    const sendTextToFlask = (text) => {
    fetch('/uploadText', {
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
    };

    const uploadQuestions = (event) => {
        const fileName = event.target.files[0].name;

        Papa.parse(event.target.files[0], {
            complete: function(results) {
                results.data.slice(1).map((d) => {
                    question.push(Object.values(d)[1])
                    answer.push(Object.values(d)[2])
                })
                question.push(fileName);
                sendTextToFlask(question);
            }
        });

        //IMPORTANT
        // for (let i = 0; i < totalQuestions; i++) {
        //     const question = questions.result[i].question;
        //     quest.push(question);
        //     console.log(question)
        // }
        
    }

    return (
    <div>
    <input 
        type="file"
        name="file"
        accept=".csv"
        onChange={uploadQuestions}
        >
    </input>
        {/* <button onClick={uploadQuestions}>Upload</button> */}
    </div>
    );
};

export default Upload;