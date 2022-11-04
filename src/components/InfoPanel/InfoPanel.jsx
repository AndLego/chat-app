import React from "react";
import styles from "./InfoPanel.module.css";

import { useParams } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";

import { FaUsers } from "react-icons/fa";
import { RiWechatFill } from "react-icons/ri";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const InfoPanel = () => {
  const [active, setActive] = React.useState(false);

  const { id } = useParams();

  const size = useWindowWidth();

  const handleToggle = () => {
    !active ? setActive(true) : setActive(false);
  };

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
          <p>{id}</p>
        </article>
        <article>
          <h3>
            <FaUsers /> Users
          </h3>
          <ul>
            <li>1asdasdas</li>
            <li>2asdasdasdsa</li>
            <li>3asdasda</li>
            <li>4ASDASDSA</li>
            <li>5ASDASDA</li>
            <li>ASASDASDASDASDASDASDASDASDASDASDASDSA6</li>
            <li>ASDASDASDASDAS7</li>
            <li>ASDASDASAS8</li>
            <li>9</li>
            <li>10ASDASDASDAS</li>
            <li>1asdasdas</li>
            <li>2asdasdasdsa</li>
            <li>3asdasda</li>
            <li>4ASDASDSA</li>
            <li>5ASDASDA</li>
            <li>ASASDASDASDASDASDASDASDASDASDASDASDSA6</li>
            <li>ASDASDASDASDAS7</li>
            <li>ASDASDASAS8</li>
            <li>9</li>
            <li>10ASDASDASDAS</li>
            <li>1asdasdas</li>
            <li>2asdasdasdsa</li>
            <li>3asdasda</li>
            <li>4ASDASDSA</li>
            <li>5ASDASDA</li>
            <li>ASASDASDASDASDASDASDASDASDASDASDASDSA6</li>
            <li>ASDASDASDASDAS7</li>
            <li>ASDASDASAS8</li>
            <li>9</li>
            <li>10ASDASDASDAS</li>
            <li>1asdasdas</li>
            <li>2asdasdasdsa</li>
            <li>3asdasda</li>
            <li>4ASDASDSA</li>
            <li>5ASDASDA</li>
            <li>ASASDASDASDASDASDASDASDASDASDASDASDSA6</li>
            <li>ASDASDASDASDAS7</li>
            <li>ASDASDASAS8</li>
            <li>9</li>
            <li>10ASDASDASDAS</li>
          </ul>
        </article>
      </div>
    </>
  );
};

export { InfoPanel };
