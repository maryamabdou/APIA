import React, { useState , useEffect} from 'react';
import { Box, Stack } from "@mui/material";
// import questions from '../pages/Interview/questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../firebase';
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";
// import csvtojson from 'csvtojson';
// import fs from "fs";

const Upload = () => {
    // const [questions, setQuest] = useState("")
    const csv_path = "../pages/Interview/Software Questions.csv";
    let question = [];
    let answer = [];
    // const totalQuestions =  questions.result.length;
    // console.log(totalQuestions)

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

    const uploadQuestions = () => {
        const csvtojson = require('csvtojson');
        const fs = require('fs');

        const jsonFilePath = '../pages/Interview/output.json';

        // Convert CSV to JSON
        csvtojson()
        .fromFile(csv_path)
        .then((jsonArrayObj) => {
            // Save the JSON data to a file
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
            console.log('Conversion successful. JSON file saved at', jsonFilePath);
        })
        .catch((error) => console.error('Error:', error));

        // for (let i = 0; i < totalQuestions; i++) {
        //     const question = questions.result[i].question;
        //     quest.push(question);
        //     console.log(question)
        // }
        // sendTextToFlask(quest);
        // quest = []
    }

    return (
    <div>
        <button onClick={uploadQuestions}>Upload</button>
    </div>
    );
};

export default Upload;