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

    if (props.currentSessionState === 'start') {
      addCue()
      
    }
  
  }, [props.currentSessionState])
    


//run media recorder

useEffect( ()=> {
 
  if (props.currentSessionState === 'listen') {
    console.log(`session state is ${props.currentSessionState}, running recorder`)
    run();
  }

  if (props.currentSessionState === 'restart') {
  
  }
}, [props.currentSessionState])





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


        startWebMic(socket)
        
        //TODO: handle receipt of transcribed data
        /** 
         * socket.on = receipt of object that holds final array of words for display
         * that data must be sent to the hooks that build the display elements, call those hooks from within this run function?
         * after data is received, close the socket, end the recorder
         */

          socket.on("results_processed", (data) => {
          console.log('speech results received from server: ', data)
          socket.disconnect()

        })

    }
}

//TODO: return component based on session state?

  return (
    <div className="stage"  ref={cueTextRef}>
 
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
