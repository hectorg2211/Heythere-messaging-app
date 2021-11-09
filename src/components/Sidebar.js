import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

// Components
import UserChat from "./UserChat";

// Material UI icons
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, Avatar } from "@mui/material";

import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

// Authentication
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "./../axios";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(
    // Set the selected Room with URL ID
    window.location.href.split("/").at(-1)
  );
  const [mostRecent, setMostRecent] = useState("");
  const [{ user }] = useStateValue();

  useEffect(() => {
    /* Real time functionality for sidebar updates */
    var pusher = new Pusher("25be7e5f9273fd3f4de3", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("rooms");
    channel.bind("updated", (updatedData) => {
      if (updatedData.name.updatedFields.lastMessage) {
        console.log("Setting", updatedData.name.updatedFields.lastMessage);
        setMostRecent(updatedData.name.updatedFields.lastMessage);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const renderRooms = () => {
    return rooms.map((room) => (
      <Link
        key={room._id}
        to={`/rooms/${room._id}`}
        onClick={() => setSelectedRoom(room._id)}
        className={room._id === selectedRoom ? "selected" : ""}
      >
        <UserChat roomName={room.name} lastMessage={room.lastMessage} />
      </Link>
    ));
  };

  /* Fetching the rooms names */
  useEffect(() => {
    axios.get("/api/v1/rooms?fields=name,lastMessage").then((response) => {
      setRooms(response.data.data);
    });
  }, [mostRecent]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Link to="/">
          <Avatar src={user?.photoURL} onClick={() => signOut(auth)}></Avatar>
        </Link>
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
      <div className="sidebar__chats">{renderRooms()}</div>
    </div>
  );
};

export default Sidebar;
