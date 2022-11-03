import React from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/MainContext";

import styles from "./Home.module.css";

const Home = () => {
  const { user, setUser, room, setRoom, socket } = React.useContext(MainContext);

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const joinRoom = () => {
    if(room !== "choose"){
      socket.emit("join_room", room, user)
    }
  }

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <main className={styles.home}>
      <h1>Chat-App</h1>
      <form>
        <div className={styles.user}>
          <label htmlFor="username">Username</label>
          {(user.length < 3 && user.length > 0 ) && <span>minimum 3 characters</span>}
          <input
            type="text"
            value={user}
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Enter username..."
            onChange={handleChange}
            maxLength="8"
          />
        </div>
        <div className={styles.room}>
          <label htmlFor="room">Room</label>
          <select name="room" id="room" onChange={handleRoom}>
            <option value="choose">Pick a room</option>
            <option value="Cool">Cool</option>
            <option value="NotCool">NotCool</option>
            <option value="Hello?">Hello?</option>
          </select>
        </div>
        <Link to={`/chat/${room}`}>
          <button disabled={user.length < 3 || room === "choose"} onClick={joinRoom}>
            Get Started
          </button>
        </Link>
      </form>
    </main>
  );
};

export { Home };
