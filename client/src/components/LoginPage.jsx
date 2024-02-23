import React, { useState } from 'react';
import TextBox from './TextBox';
import Button from './Button'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Perform login logic here (e.g., send data to a server)
        console.log('Logging in with:', { username, password });
      };
  
    return (
      <div>
        <h1>Login</h1>
        <h3>Welcome Back!</h3>
        <form>
            <TextBox
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />

            <TextBox
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />

          <Button label="Login" onClick={handleLogin}/>
        </form>
      </div>
    );
  };
  
  export default LoginPage;