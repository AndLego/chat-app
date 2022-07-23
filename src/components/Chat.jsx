import React from "react";
import socket from "./Socket";
import { useParams, Link } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { Message } from "./Message";
import { IoSendSharp } from "react-icons/io5";

import styles from "../styles/components/Chat.module.css";

const Chat = () => {
  const { user } = React.useContext(MainContext);
  
  const { id } = useParams();
  
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const time = `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(-2)}`;

  console.log("en chat", messages);

  React.useEffect(() => {
    socket.emit("connected", user);
  }, [user]);

  React.useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = React.useRef(null);
  React.useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", user, message, time);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.chat}>
      <h4>Chat in Room {id}</h4>
      <Link to={"/"}>
        <button>back</button>
      </Link>
      <ol>
        {messages.length === 0 ? (
          <Message
            user="Admin"
            message={"Send your fist message 💬 Chat start here 👇"}
            time={time}
            sender={true}
          />
        ) : (
          messages.map((e, i) => <Message key={i} time={time} {...e} />)
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
        />
        <button type="submit">
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};

export { Chat };
