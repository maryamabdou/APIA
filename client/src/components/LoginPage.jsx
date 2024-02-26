import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextBox from './TextBox';
import Button from './Button';
import LoginLeftSide from './LoginLeftSide'
import './LoginPage.css'


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (event) => {
      const endpoint = "http://localhost:3000/database";
      const data = { username, password };
      event.preventDefault();
    
      if (!username || !password) {
        setError("Please fill in all the fields.");
        return;
      }
    
      try {
        const response = await axios.post(endpoint, data);
    
        if (response.status === 201) {
          navigate("/main");
        } else {
          setError(`Login Failed, Server returned status ${response.status}`);
        }
      } catch (error) {
        setError(`Login Failed. ${error.message}`);
      }
    };
    
  
    return (
      <div className="login-page">
        <LoginLeftSide/>
        <form className = 'form'>
        <h1>Login</h1>
        <h3>Welcome Back!</h3>
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
            <Button label="Login" onClick={handleLogin}/>
            <div className='click-text'>
            <span onClick={() => navigate("/main")} style={{ cursor: 'pointer'}}>
                Create an Account ?
            </span>
            </div>
        </form>
      </div>
    );
  };
  
  export default LoginPage;