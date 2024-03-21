import React, { useState , useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from "@mui/material";
import questions from '../../assets/questions.csv';
// import soft_questions from '../../assets/Software Questions.csv';
import Avatar from "./Avatar.jsx";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { storage, database } from '../../firebase';
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { ref as databaseRef, onValue, startAfter } from "firebase/database";
import Papa from "papaparse";
import Model from 'react-modal';
import Button from '../../components/Button';
import onMic from "../../assets/images/microphone-alt-1-svgrepo-com.svg";
import offMic from "../../assets/images/microphone-slash-svgrepo-com.svg"
import './SpeechReader.css'

const SpeechReader = () => {
  const [firstQuest, setFirstQuest] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [quest, setQuest] = useState("");

  const[visibleStart,setvisibleStart]=useState(true);
  const[visibleEnd,setvisibleEnd]=useState(false);
  const navigate = useNavigate();

  const index = useRef(0); // Initial random index
  const quest_index = useRef(0); 
  const question_file = useRef('');
  
  const [videoUrl, setVideoUrl] = useState("")

  let question = [];
  let answer = [];
  let totalQuestions = 0;

  // const getQuestions = () => {
    // const fileRef = storageRef(storage, "questions/file/questions.csv");
    // getDownloadURL(fileRef)
    // .then((downloadURL) => {
    //   question_file.current = downloadURL;
    //   console.log(question_file.current)
    // })
    // .catch((error) => {
    //   console.error("Error getting file URL:", error);
    // });

    Papa.parse(question_file.current, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        // console.log(results.data)
        results.data.map((d) => {
            question.push(Object.values(d)[1])
            answer.push(Object.values(d)[2])
        })
        totalQuestions = question.length;
        // question.current = ques;
        // console.log(question[0])
        // answer.current = ans;
      }
    });
  // }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const getQuestionVideo = (videoId) => {
    var videosRef = databaseRef(database, "videos/" + videoId)
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

  const datectFer = (text) => {
    fetch('/fer', {
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

  const handleReadFromDataset = () => {
    SpeechRecognition.stopListening()
    datectFer(0)
    //compare result before getting new question
    if(firstQuest){
      setFirstQuest(false)
    }
    else {
      const answer_quest = answer[index.current];
      console.log("Correct: " + answer)
      console.log("Given: " + transcript)
      compareAnswer(answer_quest, transcript)
      resetTranscript()
    }
    // new question
      quest_index.current = quest_index.current + 1

      if(quest_index.current < 6){
        const randomIndex = Math.floor(Math.random() * totalQuestions); // Random index for each question
        index.current = randomIndex;
        const data = question[index.current];
        getQuestionVideo(index.current)
        setQuest(data);
        // handleSpeakClick(data);
        setTimeout(() => {
          SpeechRecognition.startListening({continuous: true})
          datectFer(1)
        }, 10000); //get size q from vid avatar
      }
      else{
        //No more questions
        // navigate to score page
        setvisibleEnd(true)

        fetch('/score', {
        })
        .then(response => {
            // Handle response from Flask
        })
        .catch(error => {
            console.error('Error:', error);
        });
      }
  };

  const startInterview = () => {
      setvisibleStart(false)
      var data = question[0];
      getQuestionVideo(0)
      setQuest(data);
  
      setTimeout(() => {
        SpeechRecognition.startListening({continuous: true})
        datectFer(1)
      }, 10000); //get size q from vid avatar
  };

  return (
    <div>
      <Model isOpen={visibleStart} style={{
        overlay: { // Style for the overlay (background)
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with reduced opacity
        },
          content:{width:'40%',
          height:'70%',
          margin: 'auto',
          backgroundColor: "#ffffff",
        } 
      }}>
        <div>
          <center><h1 className="titleText">Instructions</h1></center>
          <p className="text">Welcome to APIA. Your interview consists of 10 technical questions, try to answer them correctly. 
            Allow your mic and camera to answer the questions, track your eyes and detect your emotion. You have 10 seconds to think
            of the answer of the question, after 10 seconds, the mic will open automaticaaly for you to answer the question.
            When you finish click the stop button to go to next question. Good Luck!</p>
          <Button label="Start Interview" onClick={startInterview} />
        </div>
      </Model>

      <Stack direction="column" spacing={3}>
        <Box sx={{height: "85vh"}}>
          <Avatar url={videoUrl} />
        </Box>
        <Box sx={{height: "2vh"}}>
          <center><p style={{fontSize:'20px'}}>{quest}</p></center>
        </Box>
        <Stack direction="row" spacing={3} style={{justifyContent: "center"}}>
          <p style={{fontSize:'20px'}}>Mic: {listening ? <img className="img-fluid" src={onMic} alt="..." /> : <img className="img-fluid" src={offMic} alt="..." />}</p>
            <button onClick={handleReadFromDataset}>Stop</button>
          
        </Stack>
        <p>{transcript}</p>
      </Stack>

      <Model isOpen={visibleEnd} style={{
        overlay: { // Style for the overlay (background)
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with reduced opacity
        },
          content:{width:'40%',
          height:'70%',
          margin: 'auto',
          backgroundColor: "#ffffff",
        } 
      }}>
        <div>
          <h1 className="titleText">End of Interview</h1>
          <p className="text">The score of the interview is graded by losing 5 points for each wrong answer, losing 3 points for looking
          around and lose 3 points for being anxious. The total score is from 300. Navigate to score page to see your result. Good Luck!</p>
          <Button label="Get the Score"  onClick={() => navigate('/firstpage')} />
        </div>
      </Model>
    </div>
  );
};

export default SpeechReader;