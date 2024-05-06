import React, { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const Login_Popup = () => {
  const [formData2, setFormData2] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData2.username);
    if (!formData2.username || !formData2.password) {
      setError("Please Fill In All The Fields.");
      event.preventDefault();
      return;
    }
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(formData2),
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.message === "success") {
        console.log("Login successful!");
        navigate("/firstpage", { state: { username: formData2.username } });
      } else {
        console.error("Login failed:", responseData);
        //alert("Invalid username or password.");
        setError("Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div class="twelve">
        <h1>Login</h1>
      </div>

      <form className="form">
        <div className="textbox">
          <TextBox
            id="input"
            onChange={(e) => {
              setFormData2({
                ...formData2,
                username: e.target.value,
              });
              console.log(formData2.username);
            }}
            placeholder="Username"
          />

          <br />
          <TextBox 
          type="password"
            onChange={(e) => {
              setFormData2({
                ...formData2,
                password: e.target.value,
              });
            }}
            placeholder="Password"
          />
          {error && (
            <div className="error-card">
              <p>{error}</p>
            </div>
          )}
        </div>
        <br />

        <Button label="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default Login_Popup;
