import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material UI icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MoodIcon from "@mui/icons-material/Mood";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { IconButton, Avatar } from "@mui/material";

import axios from "../axios";
import moment from "moment";

import { useStateValue } from "../StateProvider";

function Chat({ dummyMessages }) {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      /* TODO: Fetch the room*/
      /* TODO: Set the room name */
      /* TODO: Fetch the messages bassed on the rooms id */
      /* TODO: Order messages by timestamp */
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/api/v1/messages", {
      message: myMessage,
      name: "Héctor García",
      timestamp: moment().subtract(0, "days").calendar(),
      received: false,
      // TODO: add roomID:
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
        {dummyMessages.map((message, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${
                message.name === user.displayName && "chat__sender"
              }`}
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
