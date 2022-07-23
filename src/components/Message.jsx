import React from "react";

import styles from "../styles/components/Message.module.css";

const Message = ({user, message, time, sender = false}) => {

  return (
    <li className={styles.message}>
      <div className={sender ? styles.sender : styles.receiver}>
        <p>{user}</p>
        <p>{message}</p>
        <span>{time}</span>
      </div>
    </li>
  );
};

export { Message };
