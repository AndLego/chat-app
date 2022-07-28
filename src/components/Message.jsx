import React from "react";

import styles from "../styles/components/Message.module.css";

const Message = ({ user, message, time, sender = false }) => {
  return (
    <li className={styles.message}>
      {user === "admin" ? (
        <div className={styles.admin}>
          <p>{message}</p>
        </div>
      ) : (
        <div className={sender ? styles.sender : styles.receiver}>
          {!sender && <h5>{user}</h5>}
          <p>{message}</p>
          <span>{time}</span>
        </div>
      )}
    </li>
  );
};

export { Message };
