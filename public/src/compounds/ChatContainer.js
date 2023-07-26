import React, {useState, useEffect, useRef} from "react";
import { styled } from "styled-components";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes.js";
import ChatInput from "./ChatInput";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function handleGetMessage() {
      const res = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(res.data);
    };
    handleGetMessage();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({fromSelf: false, message: msg});
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container className="asa">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {
              messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
    background-color: rgb(15, 15, 15);
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    background: linear-gradient( to right, rgba(0, 78, 184, 0.6), transparent);
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.224);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(61, 89, 171);
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgba(61, 89, 171, 0.5);
      }
    }
  }
  
`;

export default ChatContainer;
