//TODO: handled display of returned speech
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Stage.module.css";
import { io } from "socket.io-client";
import { startWebMic } from "../../js/recorder";
import { processCue } from "../../js/processCue";

// import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StageStartCard from "../StageComponents/StageStartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = (props) => {
  console.log(`current session state ${props.currentSessionState}`)
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

  // const [cue, setCue] = useState(null);
  const [sessionResult, setSessionResult] = useState(null);
  const cueRef = useRef("");
  const setSessionState = props.setSession
  const currentSessionState = props.currentSessionState
 

  //this effect selects a random cue 
  useEffect(() => {
    console.log(`stage current state ${currentSessionState}`);

    if (props.currentSessionState === "go") {
      let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];

      cueRef.current = selectedCue;
      // cueRef.current = "I like peanuts in my cereal.";
      console.log(`cueRef ${cueRef.current}`);


      


    }
  }, [currentSessionState]);


    //Run listening function if currentSessionState
    useEffect(() => {
      //start record function
      if (currentSessionState === "listen") {

        run();

      }
  
      if (currentSessionState === "cancel") {
       
      }
    }, [currentSessionState]);



  const run = () => {
    const socket = io.connect("http://localhost:3001");
    

    if (socket) {
      
      //TODO: send cue to server
      let processedCue = processCue(cueRef.current);
      socket.emit("send_cueData", processedCue);

      //open browser mic recording stream, send to server via socket
      startWebMic(socket);

      //when backend processing complete, sends this event with session data, closes socket
      socket.on("results_processed", (data) => {
        console.log("speech results received from server: ", data);
        
        //here, update sessionState
     
        setSessionResult(data);
        setSessionState('results')
    
        socket.disconnect();
      });

    }
  };

  const COMPONENT_STATES = {
    go: <StageStartCard />,
    start: <CueSentenceCard cue={cueRef.current} />,
    listen: <CueSentenceCard cue={cueRef.current} />,
    results: <ResultsCard sessionResult = {sessionResult} />,
    restart: <ResultsCard sessionResult = {sessionResult} />,
    cancel: <StageStartCard/>,
    
  };

  //will cause remount: props.currentSessionsState, cue state,
  return COMPONENT_STATES[props.currentSessionState];
};

export default Stage;
