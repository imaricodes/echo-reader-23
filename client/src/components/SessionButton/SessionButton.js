import React, {useState} from "react";
import styles from "./SessionButton.module.css";

const SessionButton = (props) => {

  const setSessionState = props.setSessionState
  const currentSessionsState = props.currentSessionsState
  const setIsListening = props.setIsListening

  const [buttonState, setButtonState] = useState("go");
  const [buttonText, setButtonText] = useState("Go");

  let updateButtonText = () => {

  };

  let handleClick = () => {
    if (currentSessionsState==="go") {
      setButtonText("Start")
      setSessionState('start')
    }
    else if (currentSessionsState==="start") {
      setButtonText("listen")
      setSessionState('listen')
    }

  };

  return (
    <div>
      <button
        className={`
    ${styles["btn"]} 
    ${styles["btn__sessionbtn--color--green"]}
    ${styles["btn--circle"]}
    ${
      buttonState === "listen" ? `${styles["btn__sessionbtn--color--red"]}` : ""
    }
    ${buttonState === "stop" ? `${styles["btn__sessionbtn--color--red"]}` : ""}
    `}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SessionButton;
