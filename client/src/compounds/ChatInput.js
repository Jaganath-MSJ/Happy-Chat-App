import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill
              onClick={handleEmojiPickerPickerHideShow}
              className={showEmojiPicker && "emojiOpened"}
            />
            {showEmojiPicker && (
              <Picker
                emojiStyle="google"
                onEmojiClick={handleEmojiClick}
                theme="auto"
                suggestedEmojisMode="recent"
                height={325}
                width={250}
                skinTonePickerLocation="PREVIEW"
              />
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="type your message here"
          name="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  box-shadow: 0 6px 13px white;
  padding: 0 2rem;
  border-bottom: 0.3rem;
  @media screen and (max-width: 720px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    margin-top: 1rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    .button-container {
      display: flex;
      align-content: center;
      color: white;
      gap: 1rem;
      .emoji {
        position: relative;
        svg {
          font-size: 1.5rem;
          color: #ffff00c8;
          cursor: pointer;
          transition: color 0.3s;
          &:hover,
          &.emojiOpened {
            color: yellow;
          }
        }
        .EmojiPickerReact {
          position: absolute;
          top: -350px;
        }
      }
    }
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: transform 0.3s;
      svg {
        font-size: 2rem;
        color: white;
      }
      &:hover {
        transform: scale(1.1) translateX(10px);
      }
    }
  }
`;

ChatInput.propTypes = {
  handleSendMsg: PropTypes.func.isRequired,
};

export default ChatInput;
