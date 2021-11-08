import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import Button from "@mui/material/Button";
import "./scss/main.scss";

import Login from "./components/Login";

import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);

  // TODO: Highlight selected room

  useEffect(() => {
    axios.get("/api/v1/messages").then((response) => {
      setMessages(response.data.data);
    });
  }, []);

  useEffect(() => {
    /* Real time functionality for messages */
    var pusher = new Pusher("25be7e5f9273fd3f4de3", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" />
              <Route path="/chat" element={<Chat dummyMessages={messages} />} />
              <Route path="/rooms/:roomid" element={<></>} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
