import React, { useState } from 'react';
import axios from "axios";
import TextBox from './TextBox';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


const Signin_popup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
   

   
     const navigate = useNavigate();
    // const handleLogin = async (event) => {
    //const endpoint = "http://localhost:5000/database";
    // const data = { username, password };
    // event.preventDefault();
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPass:''
    });
  
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
  
  
    
    // const handleChange = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
      
    // };
    const handleSubmit = async () => {
      try {
      fetch('/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Response from Flask route
            });
        //console.log("formData");
//         const response = await axios.post('http://127.0.0.1:5000/signup', formData);
        console.log("formData");
        //console.log(response.data);
       navigate('/firstpage');
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
  return (
      <div>
        <div class ='twelve'>
          <h1>Sign Up</h1>
        </div>
        
        <form className = 'form' >
        {error && (
          <div className="error-card">
            <p>{error}</p>
          </div>
        )}

          <div className = 'textbox'>
            <TextBox
              
              onChange={(e) =>  setFormData({
                ...formData,
               username:e.target.value
                
            })}
             
              placeholder="Username"
            />
            
            <br/>
            <TextBox
              
              
              onChange={(e) =>  setFormData({
                ...formData,
               email:e.target.value
                
            })}
              placeholder="Email"
            />
           
            
            <br/>
            <TextBox
              type="password"
              onChange={(e) =>  setFormData({
                ...formData,
               password:e.target.value
                
            })}
              
              placeholder="Password"
            />
            <TextBox
              type="confirmpass"
              onChange={(e) =>  setFormData({
                ...formData,
               confirmPass:e.target.value
                
            })}
              placeholder="ConfirmPassword"
            />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            
            
             {/* <Button label="Sign In" onClick={() => navigate("/firstpage")}/>  */}
             <Button label="Sign In" onClick={handleSubmit}/>
           {/* <input type = "submit" value = "Sign In"  /> */}
        </form>
      </div>
  );
};
export default Signin_popup;