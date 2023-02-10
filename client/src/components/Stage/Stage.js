//TODO: create local storage hook
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Stage.module.css";
import { io } from "socket.io-client";
import { startWebMic } from "../../js/recorder";

import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StageStartCard from "../StageComponents/StageStartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = () => {
  const CUE_PHRASES = [
    "The truth hurts my feet.",
    "Those are beautiful shoes.",
    "I want candy.",
    "More people eat chicken now.",
    "Salamanders are slimy creatuers.",
    "Nobody likes rotten candy.",
    "Math is fun.",
    "A sunny day is a great day.",
    "I like peanuts in my cereal.",
  ];

  const run = () => {
    const socket = io.connect("http://localhost:3001");

    if (socket) {
      // console.log('client id ', socket)
      socket.emit("start_speech", "start_speech");
      startWebMic(socket);
      //socket response received, do this
      /**
       *
       */
    }
  };

  let cue = '';
  const cueTextRef = useRef();
  const presentationContainerRef = useRef();

  const [sessionState, setSessionState] = useContext(SessionContext);

  let addCue = () => {
    let cue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
    console.log("index: ", cue);
    window.localStorage.setItem('cue', cue);
    console.log(presentationContainerRef.current);
    let newDiv = document.createElement("div");
    newDiv.classList.add('cue')
    newDiv.innerText = cue;
    presentationContainerRef.current.appendChild(newDiv);

    return cue;
  };

  return (
    <div ref={cueTextRef}>
      <div className="contols">
        <button
          className={`
    
    ${styles["btn"]} 
    ${styles["btn--green"]}
    ${styles["btn--circle"]}
    `}
          onClick={addCue}
        >
          Go
        </button>
      </div>
      <div
        ref={presentationContainerRef}
        className={`${styles["presentation-container"]} ${styles["stage"]}`}
      >
        <div className="presentation-content">{cue}</div>
      </div>
    </div>
  );
};

export default Stage;
