import React from "react";
import io from "socket.io-client";

const MainContext = React.createContext();

const socket = io("https://andlego-chat-app.herokuapp.com/");
// const newSocket = io("localhost:3000");
socket.on("connect", (socket) => {
  console.log("socket connected", socket);
});

const MainProvider = (props) => {
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("JavaScript");
 // const [socket, setSocket] = React.useState(null);
  const [panel, setPanel] = React.useState(false);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        room,
        setRoom,
        socket,
        panel,
        setPanel,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
