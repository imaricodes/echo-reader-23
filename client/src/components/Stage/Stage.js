//TODO: create local storage hook?
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Stage.module.css";
import { io } from "socket.io-client";
import { startWebMic } from "../../js/recorder";
import { processCue } from "../../js/processCue";

import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StageStartCard from "../StageComponents/StageStartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = (props) => {

  useEffect(() => {
    
    console.log(`stage current state ${props.currentSessionState}`)
    //do something with this state (run recorder, etc)
  
  }, [props.currentSessionState])
    

  //session button state
  const [sessionButton, setSessionButton] = useState('')

  const handleSessionButton = () => {
  //if sesionbutton state is "go" (initial state is go, showing 'go' text), * set stage state to 'display clue',  set session button state to start (pass state as prop?)


   //if sesionbutton state is "start" (showing 'start' text), set stage state to 'display clue'
  }


  const run = () => {
    const socket = io.connect("http://localhost:3001")

    if (socket) {

        // console.log('client id ', socket)
        //TODO: send cue and max words to backend

        let cue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
        let processedCue = processCue(cue)
        console.log(`stringified ${JSON.stringify(processedCue)}`)
        console.log(`cue length ${processedCue.cueLength}`)
        socket.emit ("send_cueData", processedCue)

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
    // let cue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
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
    <div className="stage"  ref={cueTextRef}>
      <div className="stage-controls">
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
