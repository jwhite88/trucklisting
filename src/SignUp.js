import React, { useState } from "react";
import styled from "styled-components";
// import { useHistory } from 'react-router';
// useNavigate - react-router-dom

const LogBox = styled.div`
  display: grid;
  justify-content: space-evenly;
  border: solid black;
  padding: 20px;
  margin: 20px;
`;

function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, userName, password);
    const newUser = {
      email: email,
      username: userName,
      password: password,
    };
    const response = await fetch("/users/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
      },
      body: JSON.stringify(newUser),
    });
    const result = await response.json();
    console.log(result);
    localStorage.setItem("jsonwebtoken", result.jwt);
  
    // Show success message if signup was successful
    if (response.ok) {
      alert("Signup success! Please login to continue"); // Display the alert message
    }
  };
  
  
 
  

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "user") {
      setUserName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div>
      <LogBox>
        <h1>Sign Up</h1>

        <form
          style={{
            display: "grid",
            border: "solid black",
            padding: "10px",
            margin: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={email}
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <br />

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
    </div>
  );
}

export default SignUp;
