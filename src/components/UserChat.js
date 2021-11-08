import React from "react";
import { Avatar } from "@mui/material";

// TODO: Add props with room name and last message in the room
const UserChat = () => {
  return (
    <div className="userChat">
      <Avatar />
      <div className="userChat__info">
        <h2>Room name</h2>
        <p>Last message sent</p>
      </div>
    </div>
  );
};

export default UserChat;
