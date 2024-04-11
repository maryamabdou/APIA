import React, { useState } from "react";
//import axios from "axios";
import TextBox from "./TextBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
//import { withRouter } from 'react-router-dom';

const Signin_popup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPass
    ) {
      setError("Please Fill In All The Fields.");
      //alert("Please Fill In All The Fields.");
      return;
    }
    if (!isEmailValid(formData.email)) {
      setError("Please enter a valid email address.");
      //alert("Please enter a valid email address.")
      return;
    }

    if (formData.password !== formData.confirmPass) {
      setError("Password and confirm password do not match.");
      // alert("Password and confirm password do not match.")
      return;
    }
    try {
      fetch("/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((responseData) => {
          // const messages = responseData.messages; // Access the list of messages

          // // messages.forEach(messageObject => {
          // //   const message = messageObject.message;
          //   console.log(message);

          // });

          console.log(responseData); // Response from Flask route
        });

      console.log("formData");
      //console.log(response.data);
      //alert('successfull');
      navigate("/firstpage", { state: { username: formData.username } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div class="twelve">
        <h1>Sign Up</h1>
      </div>

      <form className="form">
        <div className="textbox">
          <TextBox
            id="input"
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
              console.log(formData.username);
            }}
            placeholder="Username"
          />

          <br />
          <TextBox
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
              console.log(formData.email);
            }}
            placeholder="Email"
          />

          <br />
          <TextBox
            type="password"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            placeholder="Password"
          />
          <TextBox
            type="confirmpass"
            onChange={(e) => {
              console.log(e.target.value);
              setFormData({
                ...formData,
                confirmPass: e.target.value,
              });
            }}
            placeholder="ConfirmPassword"
          />
          {error && (
            //<div className="error-card">
            <div
              className="error-card"
              style={{
                marginBottom: "1em",
                position: "relative",
                bottom: "0",
                left: "-80%",
              }}
            >
              <p>{error}</p>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />

        {/* <Button label="Sign In" onClick={() => navigate("/firstpage")}/>  */}
        <Button label="Sign In" onClick={handleSubmit} />
        {/* <input type = "submit" value = "Sign In"  /> */}
      </form>
    </div>
  );
};
export default Signin_popup;
