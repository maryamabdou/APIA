import "./App.css";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage"
import Interview from "./pages/Interview/Interview";
import Upload from "./scripts/Upload";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Interview />
      {/* <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
