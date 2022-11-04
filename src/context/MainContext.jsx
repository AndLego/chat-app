import React from "react";
import io from "socket.io-client";

const MainContext = React.createContext();

const MainProvider = (props) => {
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("choose");
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
     const newSocket = io("https://andlego-chat-app.herokuapp.com/");
    //const newSocket = io("localhost:3000");
    newSocket.on("connect", (socket) => {
      console.log("socket connected", socket);
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        room,
        setRoom,
        socket,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
