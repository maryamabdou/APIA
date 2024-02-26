import React, { useState , useEffect} from 'react';
import { Box, Stack } from "@mui/material";
import questions from '../pages/Interview/questions.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../firebase';
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";

const Upload = () => {
    const quest = [];
    const totalQuestions =  questions.result.length;

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
        for (let i = 0; i < totalQuestions; i++) {
            const question = questions.result[i].question;
            quest.push(question);
        }
        sendTextToFlask(quest);
    }

    return (
    <div>
        <button onClick={uploadQuestions}>Upload</button>
    </div>
    );
};

export default Upload;