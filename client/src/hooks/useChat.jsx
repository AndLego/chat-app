import React from "react";
import { MainContext } from "../context/MainContext";

const useChat = () => {
  const [messages, setMessages] = React.useState([]);
  const { user, room, socket } = React.useContext(MainContext);

  React.useEffect(() => {
    socket.emit("connected", user, room)
  }, [user]);

  React.useEffect(() => {
    socket.on("messages", (message) => {
      const checkMessage = {
        ...message,
        sender: message.senderId === socket.id,
      };
      setMessages((msgs) => [...msgs, checkMessage]);
    });
    return() => {socket.off()}
  }, [messages])

  const sendMessage = (text) => {
    socket.emit("message", {
      user: user,
      message: text,
      senderId: socket.id,
      time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(
        -2
      )}`,
      room
    });
  };
  return { messages, sendMessage };
};

export { useChat };
