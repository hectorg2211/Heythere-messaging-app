import React from "react";
import { Avatar } from "@mui/material";

const UserChat = ({ roomName, lastMessage }) => {
  return (
    <div className="userChat">
      <Avatar />
      <div className="userChat__info">
        <h2>{roomName}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default UserChat;
