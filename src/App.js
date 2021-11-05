import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import axios from "./axios";

import "./scss/main.scss";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/messages").then((response) => {
      setMessages(response.data.data);
    });
  }, []);

  useEffect(() => {
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
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
