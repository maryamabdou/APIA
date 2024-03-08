import React, { useState } from 'react';
import axios from "axios";
import TextBox from './TextBox';
import Button from './Button';
import { useHistory, useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import "./LoginLeftSide.css"



const Login_Popup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (event) => {
    const endpoint = "http://localhost:3000/database";
    const data = { username, password };
    event.preventDefault();
  
    // if (!username || !password) {
    //   setError("Please fill in all the fields.");
    //   return;
    // }
  
    // try {
    //   const response = await axios.post(endpoint, data);
  
    //   if (response.status === 201) {
    //     navigate("/main");
    //   } else {
    //     setError(`Login Failed, Server returned status ${response.status}`);
    //   }
    // } catch (error) {
    //   setError(`Login Failed. ${error.message}`);
    // }
  };
  
  return (
      <div>
        <div class ='twelve'>
          <h1>Login</h1>
        </div>
        
        <form className = 'form'>
        {error && (
          <div className="error-card">
            <p>{error}</p>
          </div>
        )}

          <div className = 'textbox'>
            <TextBox
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
            <br/>
            <TextBox
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            
            </div>
            <br/>
            
            <Button label="Login" onClick={() => navigate("/firstpage")}/>
            <div className='click-text'>
            <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer'}}>
                Create an Account ?
            </span>
            <div className='forgot_password'>
            <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer'}}>
                Forgot Password?
            </span>
            </div>
            </div>
        </form>
      </div>
  );
};
export default Login_Popup;