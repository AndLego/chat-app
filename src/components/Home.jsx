import React from "react";
import { Link } from "react-router-dom";
import {MainContext} from "../context/MainContext"

import styles from "../styles/components/Home.module.css";

const Home = () => {
  const {user, setUser, room, setRoom} = React.useContext(MainContext)

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <main className={styles.home}>
      <h1>Chat-App</h1>
      <form>
        <div className="user">
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={user}
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Enter username..."
            onChange={handleChange}
          />
        </div>
        <div className="room">
          <label htmlFor="room">Room</label>
          <select name="room" id="room" onChange={handleRoom}>
            <option value="Cool">Cool</option>
            <option value="NotCool">NotCool</option>
            <option value="Hello?">Hello?</option>
          </select>
        </div>
        <Link to={`/chat/${room}`}>
          <button disabled={user.length < 3}>Get Started</button>
        </Link>
      </form>
    </main>
  );
};

export { Home };
