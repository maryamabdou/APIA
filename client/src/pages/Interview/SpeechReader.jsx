import React, { useState , useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, duration } from "@mui/material";
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
  const active = useRef(false);
const [seconds, setSeconds] = useState(0);

  // // console.log("Active in timer: " + active);
  // let interval = null;
  // useEffect(() => {
  //   if (active.current) {
  //     // setSeconds(0)
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //   } 
  //   // else if (!active && seconds !== 0) {
  //   //   // clearInterval(interval);
  //   //   setSeconds(0)
  //   // }
  //   setSeconds(0)
  //   return () => clearInterval(interval);
  // }, [active.current]);


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
  const [imageUrl, setImageUrl] = useState("")

  let question = [];
  let answer = [];
  let totalQuestions = 0;
  const videoDuration = useRef(0);
  

  // const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    // const fileRef = storageRef(storage, "questions/file/questions.csv");
    // getDownloadURL(fileRef)
    // .then((downloadURL) => {
    //   question_file.current = downloadURL;
    //   console.log(question_file.current)
    // })
    // .catch((error) => {
    //   console.error("Error getting file URL:", error);
    // });

    Papa.parse(questions, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        console.log(results.data)
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

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // async function getVideoDuration(url) {
  //   return await new Promise((resolve, reject) => {
  //     const video = document.createElement('video');
  //     video.style.display = 'none'; // Hide the video element
  
  //     video.addEventListener('loadedmetadata', () => {
  //       resolve(video.duration);
  //     });
  
  //     video.addEventListener('error', (error) => {
  //       reject(error);
  //     });
  
  //     video.src = url;
  //   });
  // }

  const getQuestionVideo = async (videoId) => {
    var videosRef = databaseRef(database, "questions/videos/" + videoId)

     onValue(videosRef, async (snapshot) => {
      const data = snapshot.val();
      videoDuration.current = data.duration;
      console.log("video duration: ", videoDuration.current);
      const filename = data.filename;
      console.log("Filename: ", filename);
      const urlRef = storageRef(storage, "questions/videos/" + filename);
      await getDownloadURL(urlRef)
      .then(async (downloadURL) => {
        setVideoUrl(downloadURL)
        console.log("Video URL:", downloadURL);


        //  await getVideoDuration(downloadURL)
        // .then(duration => {
        //   videoDuration.current = duration
        //   console.log('Video duration in seconds:', videoDuration.current);
          
        // })
        // .catch(error => {
        //   console.error('Error fetching video duration:', error);
        // });
        // const video = document.createElement('video');
        // video.src = downloadURL;
    
        // // This might be asynchronous depending on the library implementation
        // await MediaInfo.analyze({ url: downloadURL });
    
        // // Access the extracted metadata (structure might vary based on library)
        // const mediaInfo = MediaInfo.getStreamInfo();
        // const duration = mediaInfo.general && mediaInfo.general.duration; // Example property name
    
        // if (duration) {
        //     console.log("Video duration:", duration);
        // } else {
        //     console.log("Failed to extract duration");
        // }
      })
      .catch((error) => {
        console.error("Error getting video URL:", error);
      });
    });

    const imageRef = storageRef(storage, "images/avatar.jpg");
      await getDownloadURL(imageRef)
      .then(async (downloadURL) => {
        setImageUrl(downloadURL)
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

  const finalScore = (text) => {
    fetch('/score', {
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

  const handleReadFromDataset = async () => {
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

      let interval = null;
      if(quest_index.current < 6){
        const randomIndex = Math.floor(Math.random() * totalQuestions); // Random index for each question
        index.current = randomIndex;
        const data = question[index.current];
        await getQuestionVideo(index.current)
        setQuest(data);
        // handleSpeakClick(data);
        // await sleep(3000)
        console.log("Duration next quest: ", videoDuration.current);
        setTimeout(() => {
          //TODO: timer
          console.log("Before 10 secs: " + new Date().getSeconds());
          // clearTimeout()
          // active.current = true;
          // let interval = null;
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
          // console.log("Timer started");
          // console.log("Active after true: " + active.current);


        }, videoDuration.current*1000 + 2000); //get size q from vid avatar

        setTimeout(() => {
          setSeconds(0)
          clearInterval(interval);
          console.log("After 10 secs: " + new Date().getSeconds());
          SpeechRecognition.startListening({continuous: true})
          datectFer(1)
          // active.current = false;
          
          // console.log("Timer stopped");
          // console.log("Active after false: " + active.current);
        }, videoDuration.current*1000 + 12000); //get size q from vid avatar

        // if(micOpen) {
        //   SpeechRecognition.startListening({continuous: true})
        //   datectFer(1)
        // }
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

  const startInterview = async () => {
      setvisibleStart(false)
      let interval = null;
      var data = question[0];
      await getQuestionVideo(0)
      setQuest(data);
  
      console.log("Inside start: ", videoDuration.current);
      setTimeout(() => {
        //TODO: timer
        console.log("Before 10 secs: " + new Date().getSeconds());
        // clearTimeout()
        // active.current = true;
        // let interval = null;
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        // console.log("Timer started");
        // console.log("Active after true: " + active.current);


      }, videoDuration.current*1000 + 4000); //get size q from vid avatar

      setTimeout(() => {
        setSeconds(0)
        clearInterval(interval);
        console.log("After 10 secs: " + new Date().getSeconds());
        SpeechRecognition.startListening({continuous: true})
        datectFer(1)
        // active.current = false;
        
        // console.log("Timer stopped");
        // console.log("Active after false: " + active.current);
      }, videoDuration.current*1000 + 14000); //get size q from vid avatar

      // if(micOpen) {
      //   SpeechRecognition.startListening({continuous: true})
      //   datectFer(1)
      // }
  };

  const endInterview = () => {
    finalScore(1)
    navigate('/firstpage')
  }

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
          <Avatar url={videoUrl} imageUrl={imageUrl}/>
        </Box>
        <Box sx={{height: "2vh"}}>
          <center><p style={{fontSize:'20px'}}>{quest}</p></center>
        </Box>
        <Stack direction="row" spacing={3} style={{justifyContent: "center"}}>
          <p style={{fontSize:'20px'}}>Mic: {listening ? <img className="img-fluid" src={onMic} alt="..." /> : <img className="img-fluid" src={offMic} alt="..." />}</p>
            <button onClick={handleReadFromDataset}>Stop</button>
            {/* <Timer videoDuration={videoDuration}/> */}
            {/* <Timer active = {active.current}/> */}
            <div className="app">
              <div className="time">
                {seconds}s
              </div>
            </div>
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
          <Button label="Get the Score"  onClick={() => endInterview()} />
        </div>
      </Model>
    </div>
  );
};

export default SpeechReader;