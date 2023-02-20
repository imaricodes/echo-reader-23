//TODO: handled display of returned speech
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Stage.module.css";
import { io } from "socket.io-client";
import { processCue } from "../../js/processCue";

// import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StageStartCard from "../StageComponents/StageStartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = (props) => {
  console.log(`current session state ${props.currentSessionState}`);
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
  const setSessionState = props.setSession;
  const currentSessionState = props.currentSessionState;

  //this effect selects a random cue and stores as cueRef
  useEffect(() => {
    console.log(`stage current state ${currentSessionState}`);

    if (props.currentSessionState === "go") {
      let selectedCue =
        CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];

      cueRef.current = selectedCue;
      // cueRef.current = "I like peanuts in my cereal.";
      console.log(`cueRef ${cueRef.current}`);
    }
  }, [currentSessionState]);

  const [socketState, setSocketState] = useState(null);

  useEffect(() => {
    //start record function
    if (currentSessionState === "listen") {
      const socket = io.connect("http://localhost:3001");
      setSocketState(socket);
    }

    if (currentSessionState === "cancel") {
      if(socketState) {
        socketState.emit('cancel_session')
      }
    }
  }, [currentSessionState]);


  //run browser mic
  useEffect(() => {
    if (socketState) {

      let processedCue = processCue(cueRef.current);
      socketState.emit("send_cueData", processedCue);

      const getUserMediaConstraints = {
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
        video: false,
      };

      const mediaRecorderOptions = {
        mimeType: "audio/webm; codecs=opus",
      };

      const reader = new FileReader();

      let base64data;

      function sendRecorderDataWhenAvailable(e) {
        reader.readAsDataURL(e.data);
        reader.onload = () => {
          base64data = reader.result.split("base64,")[1];
          // console.log(`base64 ${base64data}`)
          socketState.emit("incoming_stream", base64data);
        };
      }

      async function startRecorder() {
        try {
          await navigator.mediaDevices
            .getUserMedia(getUserMediaConstraints)

            // let track = stream.getAudioTracks()[0];
            // console.log(track.getCapabilities());
            .then((stream) => {
              let mediaRecorder = new MediaRecorder(
                stream,
                mediaRecorderOptions
              ); //pass in options

              if (mediaRecorder) {
                mediaRecorder.start(250);
              }

              mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;

              //temporarily disabled for testing
              socketState.on("close_media_recorder", (data) => {
                console.log(`close media recorder message received ${data}`);
                mediaRecorder.stop();
                console.log(`media recorder stopped`);
                mediaRecorder = null;
                console.log(`media recorder: ${mediaRecorder}`);
              });

              //temporarily enabled for testing
              // socket.on("close_media_recorder", (data)=> {

              //   console.log(`close media recorder message received ${data}`)
              //   mediaRecorder.stop()
              //   socket.emit("close_speech_api")
              //   console.log(`media recorder stopped`)
              //   mediaRecorder=null;
              //   console.log(`media recorder: ${mediaRecorder}`)
              // })
            });
        } catch (error) {
          console.log("navigator error:", error.message);
        }
      }

      startRecorder();

      socketState.on("results_processed", (data) => {
        console.log("speech results received from server: ", data);

        //here, update sessionState
        setSessionResult(data);
        setSessionState("results");

        socketState.disconnect();
        setSocketState(null)
      });
    }
  }, [socketState]);


  const COMPONENT_STATES = {
    go: <StageStartCard />,
    start: <CueSentenceCard cue={cueRef.current} />,
    listen: <CueSentenceCard cue={cueRef.current} />,
    results: <ResultsCard sessionResult={sessionResult} />,
    restart: <ResultsCard sessionResult={sessionResult} />,
    cancel: <StageStartCard />,
  };

  //will cause remount: props.currentSessionsState, cue state,
  return COMPONENT_STATES[props.currentSessionState];
};

export default Stage;
