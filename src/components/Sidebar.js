import React, { useState, useEffect } from "react";
import Link from "react-router-dom";

// Components
import UserChat from "./UserChat";

// Material UI icons
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, Avatar } from "@mui/material";

import { useStateValue } from "../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // TODO: Read rooms collection and set the rooms array
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}></Avatar>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeRoundedIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search or start a new chat..." />
          {/* TODO: Add new room functionality */}
        </div>
      </div>
      <div className="sidebar__chats">
        {/* TODO: Map through Rooms in database  */}
        {/* TODO: Each room should be in a link to change the chat with a :roomid - */}
        {/* TODO: Get last message for each room */}
        <UserChat />
        <UserChat />
        <UserChat />
      </div>
    </div>
  );
};

export default Sidebar;
