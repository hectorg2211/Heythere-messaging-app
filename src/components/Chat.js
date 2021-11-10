import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

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

function Chat() {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [{ user }] = useStateValue();
  const { roomId } = useParams();
  const chatWindow = document.querySelector(".chat__body");

  // TODO: Prevent empty messages
  useEffect(() => {
    /* Real time functionality for messages */
    var pusher = new Pusher("25be7e5f9273fd3f4de3", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("rooms");
    channel.bind("updated", (updatedData) => {
      if (!updatedData.name.updatedFields?.messages) return;
      const newMessage = updatedData.name.updatedFields?.messages.at(-1);
      setMessages([...messages, newMessage]);
    });

    console.log(chatWindow?.scrollHeight);
    chatWindow?.scroll({
      top: chatWindow?.scrollHeight + 60,
      left: 0,
      behavior: "smooth",
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, chatWindow]);

  useEffect(() => {
    if (roomId) {
      axios.get(`/api/v1/rooms/${roomId}`).then((response) => {
        const { data: room } = response.data;
        setRoomName(room.name);
        setMessages(room.messages);
      });
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/api/v1/rooms/${roomId}`, {
      message: myMessage,
      name: user.displayName,
      timestamp: new Date(),
      received: false,
    });

    await axios.patch(`/api/v1/rooms/${roomId}`, {
      lastMessage: myMessage,
    });

    setMyMessage("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at 2:30 pm</p>
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
              className={`chat__message ${
                message.name === user.displayName && "chat__sender"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timeStamp">
                {moment(message.timestamp).fromNow()}
              </span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <MoodIcon />
        <form action="">
          <input
            type="text"
            placeholder="Type a message..."
            value={myMessage}
            onChange={(e) => setMyMessage(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default Chat;
