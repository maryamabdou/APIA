import React, { useState , useEffect} from 'react';
import { Box, Stack } from "@mui/material";
// import questions from '../pages/Interview/questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../firebase';
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";
// import csvtojson from 'csvtojson';
// import fs from "fs";
import Papa from "papaparse";
// import csv from "../assets/Software Questions.csv";
// import csv from 'csv-parse';
// import {Buffer} from 'buffer';

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

    const uploadQuestions = (event) => {
        // const csvtojson = require('csvtojson');
        // const fs = require('fs');

        // const jsonFilePath = '../pages/Interview/output.json';

        // // Convert CSV to JSON
        // csvtojson()
        // .fromFile(csv_path)
        // .then((jsonArrayObj) => {
        //     // Save the JSON data to a file
        //     // fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
        //     console.log('Conversion successful. JSON file saved at', jsonArrayObj);
        // })
        // .catch((error) => console.error('Error:', error));

        // console.log("Hello");
        Papa.parse(event.target.files[0], {
            complete: function(results) {
                console.log("Finished:", results.data);
            }
        });
        

        // const csv = require('csv-parser')
        // const fs = require('fs')
        // const results = [];

        // fs.createReadStream(csv_path)
        // .pipe(csv())
        // .on('data', (data) => results.push(data))
        // .on('end', () => {
        //     console.log(results);
        //     // [
        //     //   { NAME: 'Daffy Duck', AGE: '24' },
        //     //   { NAME: 'Bugs Bunny', AGE: '22' }
        //     // ]
        // });



        //IMPORTANT
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