import React from "react";
import styles from "./InfoPanel.module.css";

import { useWindowWidth } from "../../hooks/useWindowWidth";

import { FaUsers } from "react-icons/fa";
import { RiWechatFill } from "react-icons/ri";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const InfoPanel = ({ socket, panel }) => {
  const [active, setActive] = React.useState(false);
  const [currentRoom, setCurrentRoom] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState(null);

  const size = useWindowWidth();

  const handleToggle = () => {
    !active ? setActive(true) : setActive(false);
  };

  //Get room and users
  React.useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      setCurrentRoom(room);
      setOnlineUsers(users);
    });
  }, [panel]);

  const listUsers = onlineUsers?.map((user, key) => (
    <li key={key}>{user.username}</li>
  ));

  return (
    <>
      <div
        className={
          size.width <= 800
            ? !active
              ? `${styles.InfoPanel} ${styles.gone} `
              : `${styles.InfoPanel} ${styles.pop}`
            : styles.InfoPanel
        }
      >
        {size.width <= 800 && (
          <button
            type="button"
            className={`${styles.open}`}
            onClick={handleToggle}
          >
            {active ? (
              <IoIosArrowDropleftCircle />
            ) : (
              <IoIosArrowDroprightCircle />
            )}
          </button>
        )}
        <article>
          <h3>
            {" "}
            <RiWechatFill /> Room Name:
          </h3>
          <p>{currentRoom}</p>
        </article>
        <article>
          <h3>
            <FaUsers /> Users
          </h3>
          <ul>{listUsers}</ul>
        </article>
      </div>
    </>
  );
};

export { InfoPanel };
