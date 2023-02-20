import React, {useState, useEffect} from "react";
import styles from "./SessionButton.module.css";

const SessionButton = (props) => {

  const setSessionState = props.setSessionState
  const currentSessionsState = props.currentSessionsState
  const setIsListening = props.setIsListening

  const [buttonState, setButtonState] = useState("go");
  const [buttonText, setButtonText] = useState("Go");

  let updateButtonText = () => {

  };

  useEffect(() => {
    if (currentSessionsState==="results") {
      setButtonText("Restart")
      setSessionState('restart')
    }
  
    return () => {
      
    }
  }, [currentSessionsState])
  

  let handleClick = () => {
    if (currentSessionsState==="go" || currentSessionsState ==="cancel") {
      setButtonText("Start")
      setSessionState('start')
    }
    
   if (currentSessionsState==="start") {
      setButtonText("Cancel")
      setSessionState('listen')
    }
 

    if (currentSessionsState==="listen") {
      setButtonText("Go")
      setSessionState('cancel')
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
