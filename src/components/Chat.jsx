import React from "react";
import { useParams, Link } from "react-router-dom";
import { Message } from "./Message";
import { IoSendSharp } from "react-icons/io5";
import {useChat2} from "../hooks/useChat2"

import styles from "../styles/components/Chat.module.css";

const Chat = () => {

  const [message, setMessage] = React.useState("");
  const { id } = useParams();

  const {messages, sendMessage} = useChat2(id)
  console.log(id)

  const divRef = React.useRef(null);
  React.useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message)
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
            time="xo:xo"
            sender={true}
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
        />
        <button type="submit" disabled={message.length < 1}>
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};

export { Chat };
