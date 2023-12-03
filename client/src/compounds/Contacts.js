import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LogOut from "./LogOut";
import logo from "../assests/logo.png";

function Contacts({ contacts, currentUser, currentChat, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact) => {
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <Container className={currentChat !== undefined && "contactSelected"}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Happy Chat</h3>
            <LogOut />
          </div>
          <div className="contacts">
            {contacts.map((contact) => {
              return (
                <div
                  className={`contact ${
                    contact.username === currentChat?.username ? "selected" : ""
                  }`}
                  key={contact.username}
                  onClick={() => changeCurrentChat(contact)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Space") {
                      changeCurrentChat(contact);
                    }
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: rgb(15, 14, 14);
  border-right: 1px solid black;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.224);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.224),
        transparent
      );
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background: linear-gradient(to right, rgb(0, 78, 184), transparent);
    }
  }
  .current-user {
    background-color: rgba(0, 78, 184, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
  @media screen and (max-width: 500px) {
    &.contactSelected {
      display: none;
    }
  }
`;

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentChat: PropTypes.object.isRequired,
  changeChat: PropTypes.func.isRequired,
};

export default Contacts;
