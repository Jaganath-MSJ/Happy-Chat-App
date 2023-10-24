import React from "react";
import styled from "styled-components";
import robot from "../assests/robot.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
  gap: 1rem;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export default Welcome;
