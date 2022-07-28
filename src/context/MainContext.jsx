import React from "react";
import io from "socket.io-client";

const MainContext = React.createContext();

const MainProvider = (props) => {
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("choose");

  let socket = io("https://andlego-chat-app.herokuapp.com/");
  
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        room,
        setRoom,
        socket
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
