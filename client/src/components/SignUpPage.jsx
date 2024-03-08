import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextBox from './TextBox';
import Button from './Button';
import LoginLeftSide from './LoginLeftSide'
import './LoginPage.css'


const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
  
    const handleSignUp = async (event) => {
      const endpoint = "http://localhost:3000/database";
      const data = { name, email,password,confirmPass };
      event.preventDefault();
    
      if (!name || !email || !password || !confirmPass) {
        setError("Please fill in all the fields.");
        return;
      }

      if (!isEmailValid(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (password != confirmPass) {
        setError("Password and confirm password do not match.");
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
        <h1>Sign Up</h1>
        <h3>Welcome to APIA!</h3>
        {error && (
          <div className="error-card">
            <p>{error}</p>
          </div>
        )}
        
          <div className = 'textbox'>
            <TextBox
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your Name"
            />
            <br/>
            <TextBox
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
            />
            <br/>
            <TextBox
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <br/>
            <TextBox
              type="password"
              value={confirmPass}
              onChange={(event) => setConfirmPass(event.target.value)}
              placeholder="Confirm Password"
            />
            </div>
            <br/>
            <br/>
            <br/>
            <Button label="Sign Up" onClick={handleSignUp}/>
            <div className='click-text'>
            <span onClick={() => navigate("/")} style={{ cursor: 'pointer'}}>
                Already Have an Account ?
            </span>
            </div>
        </form>
      </div>
    );
  };
  
  export default SignUpPage;