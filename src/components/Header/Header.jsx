import React from "react";
import styles from "./Header.module.css";

import { Link } from "react-router-dom";
import { ImHappy } from "react-icons/im";

const Header = ({ socket }) => {
  //Leave chatroom
  const handleEvent = () => {
    socket.leave();
    socket.disconnect();
  };

  return (
    <div className={styles.chatHeader}>
      <h2>
        <ImHappy /> Chat-App
      </h2>

      <Link to={"/"} onClick={handleEvent}>
        <span>Leave Room</span>
      </Link>
    </div>
  );
};

export { Header };
