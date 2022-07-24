import React from "react";

const MainContext = React.createContext();

const MainProvider = (props) => {
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("choose");

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        room,
        setRoom,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
