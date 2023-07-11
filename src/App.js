import React, {Fragment} from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
  Link,
  useNavigate,
} from "react-router-dom";
import AddTruck from "./AddTruck";
import Contact from "./Contact";
import TruckList from "./TruckList";
import styled from "styled-components";
import SignUp from "./SignUp";
import Login from "./Login";
import MyTrucks from "./MyTrucks";

const Tabs = styled.button`
  border: solid black 5px;
  margin: 10px;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid;
  background: black;
`;

function App() {
  const handleLogout = () => {
    fetch("/users/logout").then(() => {
      localStorage.removeItem("jsonwebtoken");
      window.alert("Logged out");
      window.location.reload();
    });
  };

  return (
    <BrowserRouter>
      <div>
        <Container>
          <Tabs>
            <Link to="/MyTrucks">My Trucks</Link>
          </Tabs>

          <Tabs>
            <Link to="/AddTruck">Add Truck</Link>
          </Tabs>

          <Tabs>
            <Link to="/Contact">Contact</Link>
          </Tabs>
          <Tabs>
            <Link to="/">Find Truck</Link>
          </Tabs>

          <Tabs>
            <Link to="/login">Login</Link>
          </Tabs>

          <Tabs>
            <button onClick={handleLogout}>Logout</button>
          </Tabs>
        </Container>
        <Fragment>
        <Routes>
            <Route exact path="/" element={<TruckList />} />
            <Route path="/AddTruck" element={<AddTruck />} />
            <Route path="/MyTrucks" element={<MyTrucks />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          
        </Routes>
        </Fragment>
      </div>
    </BrowserRouter>
  );
}

export default App;
