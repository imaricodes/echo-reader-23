//EXPRES SERVER SETUP https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { processResponse } from "./js/processTranscription.mjs";
import {evaluateSession} from './js/utility.mjs';

const app = express();

/** MIDDLEWARE */

app.use(cors());

/** CREATE SERVER */
const server = createServer(app);
const io = new Server(server, {
  cors: {
    orgin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Imports the Google Cloud client library
import speech from "@google-cloud/speech";
const client = new speech.SpeechClient();

const config = {
  encoding: "WEBM_OPUS",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};

const request = {
  config,
  interimResults: true,
};

io.on("connection", (socket) => {
  let cueData = {};

  console.log(`connected with user id ${socket.id}`);

  socket.on("send_cueData", (data) => {
    console.log(`cueData received: `, data);
    cueData = { ...data };
    console.log(`cueData spread ${cueData.display}`)
  });

  const speechCallback = (stream) => {
    //TODO: set timeout in case final transcript does not arrive
    console.log("SPEECH CALLBACK CALLED");
    let words = stream.results[0].alternatives[0].transcript;
    let wordsArray = words.split(" ");

    console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);

    // console.log("FINAL TRANSCRIPT: ", words);
    // console.log("word array length ", wordsArray.length);
    // console.log(`words: ${words}`)
    // console.log(typeof words)
    console.log(JSON.stringify(wordsArray));

    if (stream.results[0].isFinal == true) {
      //TODO: where in this process do I close the api connection?
      socket.emit("close_media_recorder", "close_media_recorder")

      
      let processedResponse = processResponse(words, cueData.cueLength);

      console.log(`processedResult evaluate ${processedResponse.evaluate}`)
      console.log(`processedResult display ${processedResponse.display}`)

      //evaluate cue, response and return session result object

       let sessionResult = evaluateSession(cueData, processedResponse)

       socket.emit("results_processed", sessionResult)
      //process result

    }

  };

  let recognizeStream = client
    .streamingRecognize(request)
    .on("error", (err) => {
      if (err.code === 11) {
        console.log(`errorcode 11 ${err}`);
        // restartStream();
      } else {
        console.error("API request error " + err);
      }
    })
    .on("data", speechCallback);


  //disabled temporarily for testing
  // socket.on("incoming_stream", (audio) => {
  //   console.log(`stream coming`)
  //   if (recognizeStream) {
  //     recognizeStream.write(audio);
  //   } else console.log('no recognize stream')
    
  // });

  //enabled temporarily for testing
  socket.on("incoming_stream", (audio) => {
    console.log(`stream coming`)
    socket.emit("close_media_recorder", "close_media_recorder")

    let sessionResult = [
        ["I", "like", "peanuts", "in", "my", "cereal."],
        ["I", "like", "peanuts", "in", "my", "cereal."],
        { cueWord: "i", responseWord: "i", match: "true", responseDisplayWord: "I" },
        {
          cueWord: "like",
          responseWord: "like",
          match: "true",
          responseDisplayWord: "like"
        },
        {
          cueWord: "peanuts",
          responseWord: "peanuts",
          match: "true",
          responseDisplayWord: "peanuts"
        },
        {
          cueWord: "in",
          responseWord: "in",
          match: "true",
          responseDisplayWord: "in"
        },
        {
          cueWord: "my",
          responseWord: "my",
          match: "true",
          responseDisplayWord: "my"
        },
        {
          cueWord: "cereal",
          responseWord: "cereal",
          match: "true",
          responseDisplayWord: "cereal."
        }
      ];

    socket.emit("results_processed", sessionResult)

    
  });

  socket.on("close_speech_api", (message) => {
    console.log(message)
    if (recognizeStream) {
      console.log('closing speech api...')
      recognizeStream.end()
      recognizeStream = null;
     
    } else {console.log('speech api already closed')} 
    
  })

});

server.listen(3001, () => {
  console.log("server is running local host 3001");
});
