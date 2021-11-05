import React, { useState, useEffect } from "react";

// Components
import UserChat from "./UserChat";

// Material UI icons
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, Avatar } from "@mui/material";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // TODO: Read rooms collection and set the rooms array
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="./assets/Hector.jpg"></Avatar>
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
        </div>
      </div>
      <div className="sidebar__chats">
        {/* TODO: Map through Rooms in database */}
        <UserChat />
        <UserChat />
        <UserChat />
      </div>
    </div>
  );
};

export default Sidebar;
