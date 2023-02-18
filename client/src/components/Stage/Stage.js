//TODO: handled display of returned speech
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
  //Run listening function if currentSessionState
  useEffect(() => {
    if (props.currentSessionState === "listen") {
      run();
    }

    if (props.currentSessionState === "restart") {
    }
  }, [props.currentSessionState]);

  useEffect(() => {
    console.log(`stage current state ${props.currentSessionState}`);

    if (props.currentSessionState === "go") {
      let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];

      cueRef.current = selectedCue;
      // cueRef.current = "I like peanuts in my cereal.";
      console.log(`cueRef ${cueRef.current}`);
    }
  }, [props.currentSessionState]);

  const run = () => {
    const socket = io.connect("http://localhost:3001");

    if (socket) {
      // console.log('client id ', socket)
      //TODO: send cue and max words to backend
      let processedCue = processCue(cueRef.current);
      socket.emit("send_cueData", processedCue);

      startWebMic(socket);

      //TODO: handle receipt of transcribed data
      /**
       * socket.on = receipt of object that holds final array of words for display
       * that data must be sent to the hooks that build the display elements, call those hooks from within this run function?
       * after data is received, close the socket, end the recorder
       */

      //when received, will shut down media recorder
      socket.on("results_processed", (data) => {
        console.log("speech results received from server: ", data);
        
        //here, update sessionState
        setSessionResult(data);
        setSessionState('results')
    
        socket.disconnect();
      });

      //append element that contains cue and response, but this has to happen only if successful response is received
    }
  };

  const COMPONENT_STATES = {
    go: <StageStartCard />,
    start: <CueSentenceCard cue={cueRef.current} />,
    listen: <CueSentenceCard cue={cueRef.current} />,
    results: <ResultsCard sessionResult = {sessionResult} />
  };

  //will cause remount: props.currentSessionsState, cue state,
  return COMPONENT_STATES[props.currentSessionState];
};

export default Stage;
