import React, { useState } from "react";

// Material UI icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MoodIcon from "@mui/icons-material/Mood";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { IconButton, Avatar } from "@mui/material";

import axios from "../axios";
import moment from "moment";
import SelectInput from "@mui/material/Select/SelectInput";

function Chat({ messages }) {
  const [myMessage, setMyMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/api/v1/messages", {
      message: myMessage,
      name: "Héctor García",
      timestamp: moment().subtract(0, "days").calendar(),
      received: false,
    });

    setMyMessage("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchRoundedIcon />
          </IconButton>
          <IconButton>
            <AttachFileRoundedIcon />
          </IconButton>
          <IconButton>
            <ExpandMoreRoundedIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${!message.received && "chat__sender"}`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timeStamp">{message.timestamp}</span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <MoodIcon />
        <form action="" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={myMessage}
            onChange={(e) => setMyMessage(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default Chat;
