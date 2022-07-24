import React from "react";
import io from "socket.io-client";
import { MainContext } from "../context/MainContext";

let SERVER = "http://localhost:3000";
let socket = io(SERVER);

const useChat2 = (chatId) => {
  const socketRef = React.useRef();
  const [messages, setMessages] = React.useState([]);
  const { user } = React.useContext(MainContext);

  React.useEffect(() => {
    socketRef.current = io(SERVER, {
      query: { chatId },
    });

    socketRef.current.emit("connected", user)

    socketRef.current.on("messages", (message) => {
      const checkMessage = {
        ...message,
        sender: message.senderId === socketRef.current.id,
      };
      setMessages((msgs) => [...msgs, checkMessage]);
    });
    return () => {
      socketRef.current.disconnect(); //te desconecta del chat
    };
  }, [chatId]);

  const sendMessage = (text) => {
    socketRef.current.emit("message", {
      user: user,
      message: text,
      senderId: socketRef.current.id,
      time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(
        -2
      )}`,
    });
  };
  return { messages, sendMessage };
};

export { useChat2 };
