import React from "react";
import { MainContext } from "../context/MainContext";

const useChat = () => {
  const [messages, setMessages] = React.useState([]);
  const { user, room, socket, panel, setPanel } = React.useContext(MainContext);

  //MESSAGES HANDLER
  React.useEffect(() => {
    //Receives message from server
    socket.on("messages", (message) => {
      //users infopanel handler
      if (message.user === "admin") {
        setPanel(!panel);
      }

      //chatbox handler
      const checkMessage = {
        ...message,
        sender: message.senderId === socket.id,
      };
      setMessages((msgs) => [...msgs, checkMessage]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  //Sends message to server
  const sendMessage = (text) => {
    socket.emit("message", {
      user: user,
      message: text,
      senderId: socket.id,
      time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(
        -2
      )}`,
      room,
    });
  };

  return { messages, sendMessage };
};

export { useChat };
