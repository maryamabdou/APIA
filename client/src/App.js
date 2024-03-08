import "./App.css";
import LoginPage from "./components/LoginPage";
import Signin_popup from "./components/Signin_popup";
import MainPage from "./components/MainPage"
import Interview from "./pages/Interview/Interview";
import Firstpage from "./pages/FirstPage/Firstpage"
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signin_popup />} />
          

        
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/firstpage" element={<Firstpage />} />
          {/* <Route path="/signin_popup" element={<Signin_popup />} /> */}
          <Route path="/main" element={<Main />} />
          <Route path="/interview" element={<Interview />} />


        </Routes>
      </Router> 
    </div>
  );
}

export default App;
