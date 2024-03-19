import React, { useState } from 'react';
import TextBox from './TextBox';
import Button from './Button';
import {  useNavigate } from 'react-router-dom';
import "./LoginPage.css"



const Login_Popup = () => {
    
    const [formData2, setFormData2] = useState({
      username: '',
      password: ''
     
    });
    
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
   
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
    
 
 
  const handleSubmit = async (event) => {
    event.preventDefault();
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
      
      if (responseData.message === 'success') {
          console.log("Login successful!");
          navigate('/firstpage');
      } else {
          console.error('Login failed:', responseData);
          alert("Invalid username or password.");
      }
  } catch (error) {
      console.error('Error:', error);
  }
};
//     try {
//     fetch('/login', {
//               method: 'POST',
//               body: JSON.stringify(formData2),
//               headers: { 'Content-Type': 'application/json' }
//           })
//           .then(response => response.json())
//           .then(responseData => {
//             console.log(responseData);
//           //   if (responseData === '200') {
//           //     console.log("Hello, this is a debug message of login!");
//           //     navigate('/firstpage');
//           // } else {
//           //     console.error('Login failed:', responseData);
//           //     // Handle login failure, e.g., display error message to user
//           // }
//           });
//       //console.log("formData");
// //         const response = await axios.post('http://127.0.0.1:5000/signup', formData);
//       //.log("formData2");
//       //console.log(response.data);
//      navigate('/firstpage');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
  
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
        {/*    <div className='click-text'>
            {/* <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer'}}>
                Create an Account ?
            </span> 
            <a href="./signup" style={{ color:'black', fontSize: '16px', fontWeight: 'bold',cursor: 'pointer'}}>Create an Account ?</a>
            </div>*/}
        </form>
      </div>
            
  );
};
export default Login_Popup;