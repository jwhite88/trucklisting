import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";

// useNavigate - react-router-dom

const LogBox = styled.div`
  display: flex;
  border: solid black;
  padding: 20px;
  margin: 20px;
`;

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userName, password);
    const newUser = {
      username: userName,
      password: password,
    };
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
      },
      body: JSON.stringify(newUser),
    });
    const result = await response.json();
    console.log(result);
    if(result){
      localStorage.setItem("jsonwebtoken", result.jwt);
      window.alert('Successful login!')
      navigate('/')
    } else {
      window.alert("Please sign up!")
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "user") {
      setUserName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  if (localStorage.getItem("jsonwebtoken")) {
    return (
      <div>
        <h1>You are already logged in!</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div>
      <LogBox>
        <h1>Login</h1>

        <form
          style={{
            display: "flex",
            border: "solid black",
            padding: "10px",
            margin: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={userName}
            name="user"
            placeholder="username"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </LogBox>
      <Link to="/signup">Sign Up</Link>
    
    </div>
  );
}

export default Login;
