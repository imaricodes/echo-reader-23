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

  const run = () => {
    const socket = io.connect("http://localhost:3001")

    if (socket) {
        // console.log('client id ', socket)
        socket.emit("start_speech","start_speech")
        startWebMic(socket)
        
        //TODO: handle receipt of transcribed data
        /** 
         * socket.on = receipt of object that holds final array of words for display
         * that data must be sent to the hooks that build the display elements, call those hooks from within this run function?
         * after data is received, close the socket, end the recorder
         */
    }
}


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
          onClick={run}
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
