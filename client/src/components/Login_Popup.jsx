import React, { useState } from 'react';
import TextBox from './TextBox';
import Button from './Button';
import {  useNavigate } from 'react-router-dom';
import "./LoginPage.css"

// const formData2 = {
//   username: '',
//   password: ''
// };

const Login_Popup = () => {
  ;
    const [formData2, setFormData2] = useState({
      username: '',
      password: ''
     
    });
    
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    
 
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData2.username)
    if (!formData2.username||!formData2.password ) {
      setError("Please Fill In All The Fields.");
      event.preventDefault();
      return;
    }
    try {
      const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify(formData2),
          headers: { 'Content-Type': 'application/json' }
      });
      
      const responseData = await response.json();      
  console.log(responseData)
      if (responseData.message === 'success') {
          console.log("Login successful!");
          // navigate('/firstpage',formData2.username);
          // history.push('/firstpage', { username: formData2.username });
          navigate('/firstpage', { state: { username: formData2.username } });
      } else {
          console.error('Login failed:', responseData);
          alert("Invalid username or password.");
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

  
  
  return (
      <div>
        <div class ='twelve'>
          <h1>Login</h1>
        </div>
        
        <form className = 'form'>
        

<div className = 'textbox'>
            <TextBox id="input"
             onChange={(e) => {

    setFormData2({
        ...formData2,
        username:e.target.value
    });
    console.log(formData2.username)
  }}

             
              placeholder="Username"
            />
            
            <br/>
            <TextBox
              type="password"
              onChange={(e) => {

    setFormData2({
        ...formData2,
        password:e.target.value
    });
  }}
              
              placeholder="Password"
            />
            {error && (
           <div className="error-card">
               <p>{error}</p>
               {/* {alert(error)} */}
               
           </div>
            )}
            
            </div>
            <br/>
            
            <Button label="Login"  onClick={handleSubmit}/>
            <div className='click-text'>
            {/* <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer'}}>
                Create an Account ?
            </span> */}
            <a href="./signup" style={{ color:'black', fontSize: '16px', fontWeight: 'bold',cursor: 'pointer'}}>Create an Account ?</a>
            <div className='forgot_password'>
            {/* <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer'}}>
                Forgot Password?
            </span> */}
            <a href="./signup" style={{color:'black', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}>Forgot Password?</a>
            <div className='forgot_password'></div>
            </div>
            </div>
        </form>
      </div>
  );
};
export default Login_Popup;