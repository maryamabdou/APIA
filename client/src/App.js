import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Signin_popup from "./components/Signin_popup";
import Interview from "./pages/Interview/Interview";
import Upload from "./scripts/Upload";
import Main from "./pages/Main/Main";
import Firstpage from "./pages/FirstPage/Firstpage";

function App() {
  return (
    <div>
      {/* <Upload /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signin_popup />} />
          <Route path="/firstpage" element={<Firstpage />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
