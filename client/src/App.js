
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import "./App.css";
import axios from 'axios';
import Login_Popup from "./components/Login_Popup";
import Signin_popup from "./components/Signin_popup";
import Interview from "./pages/Interview/Interview";
import Upload from "./scripts/Upload";
import Main from "./pages/Main/Main";
import Firstpage from "./pages/FirstPage/Firstpage";

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  // // Check if user is already logged in when component mounts
  useEffect(() => {
    // Perform check session logic here
    axios.get('http://localhost:5000/checksession')
      .then(response => {
        setIsLoggedIn(response.data.authenticated);
        console.log("get hena");
      })
      .catch(error => {
        setIsLoggedIn('Error checking session:', error);
      });
  }, []);
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login_Popup />} />
          <Route path="/signup" element={<Signin_popup />} />
          {isLoggedIn ? (
            <>
              <Route path="/firstpage" element={<Firstpage />} />
              <Route path="/interview" element={<Interview />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router> 
    </div>
  );
}
export default App;
