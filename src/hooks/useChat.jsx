import React from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE = "newMessage";
const SOCKET_SERVER = "http://localhost:8085";

const useChat = (chatId) => {
  const [msgs, setMsgs] = React.useState([]);
  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { chatId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
        sender: message.senderId === socketRef.current.id,
      };
      setMsgs((msgs) => [...msgs, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect(); //te desconecta del chat
    };
  }, [chatId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE, {
      body: messageBody,
      senderId: socketRef.current.id,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    });
  };

  return { msgs, sendMessage };
};

export { useChat };
