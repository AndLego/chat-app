import React from "react";
import { Navigate } from "react-router-dom";

import { Message } from "../Messages/Message";
import { InfoPanel } from "../InfoPanel/InfoPanel";

import { useChat } from "../../hooks/useChat";
import { MainContext } from "../../context/MainContext";

import { IoSendSharp } from "react-icons/io5";
import styles from "./Chat.module.css";
import Header from "../Header/Header";

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const { user, socket } = React.useContext(MainContext);

  const { messages, sendMessage } = useChat();

  const divRef = React.useRef(null);
  if (user.length > 0) {
    React.useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {user.length == 0 ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.chat}>
          <Header socket={socket} />
          <InfoPanel />
          <ol>
            {messages.length === 0 ? (
              <Message
                user="admin"
                message={"Send your fist message 💬 Chat start here 👇"}
              />
            ) : (
              messages.map((e, i) => <Message key={i} {...e} />)
            )}
            <div ref={divRef}></div>
          </ol>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              placeholder="Message"
              autoComplete="off"
              onChange={handleChange}
              maxLength="200"
            />
            <button type="submit" disabled={message.length < 1}>
              <IoSendSharp />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export { Chat };
