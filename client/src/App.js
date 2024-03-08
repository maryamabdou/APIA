import "./App.css";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import MainPage from "./components/MainPage"
import Interview from "./pages/Interview/Interview";
import Upload from "./scripts/Upload";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div>
      <Interview />
      {/* <Router>
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
