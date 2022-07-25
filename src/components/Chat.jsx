import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Message } from "./Message";
import { useChat } from "../hooks/useChat";
import { MainContext } from "../context/MainContext";

import { IoSendSharp } from "react-icons/io5";
import { BsBackspace } from "react-icons/bs";
import styles from "../styles/components/Chat.module.css";

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const { id } = useParams();
  const { user } = React.useContext(MainContext);

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

  const handleEvent = () => {
    socket.disconnect()
  }

  return (
    <>
      {user.length == 0 ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.chat}>
          <div className={styles.chatHeader}>
            <Link to={"/"} onClick={handleEvent}>
              <BsBackspace />
            </Link>
            <h4>Currently on room "{id}"</h4>
          </div>
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
