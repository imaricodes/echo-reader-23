//EXPRES SERVER SETUP https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s


import express from 'express'
import { createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

import { processResponse } from './js/processTranscription.mjs'


const app = express();


/** MIDDLEWARE */

app.use(cors());


/** CREATE SERVER */
const server = createServer(app);
const io = new Server(server, {
    cors: {
        orgin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
} )



// Imports the Google Cloud client library
import speech from '@google-cloud/speech'
const client = new speech.SpeechClient();

const config = {
  encoding: 'WEBM_OPUS',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  config,
  interimResults: true,
};

io.on("connection", (socket) => {
  let cueData = {};

  console.log(`connected with user id ${socket.id}`)

  socket.on("send_cueData", (data) => {
    cueData = {...data}
  })


const speechCallback = (stream) => {
  //TODO: set timeout in case final transcript does not arrive
  console.log('SPEECH CALLBACK CALLED')
  let words = stream.results[0].alternatives[0].transcript;
  let wordsArray = words.split(" ");

 
  console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);


  // console.log("FINAL TRANSCRIPT: ", words);
  // console.log("word array length ", wordsArray.length);
  // console.log(`words: ${words}`)
  // console.log(typeof words)
  // console.log(JSON.stringify(wordsArray));

   if (stream.results[0].isFinal == true) {
    //process result
    let processedResult = processResponse(words, 3)

    console.log(`processedResult evaluate ${processedResult.evaluate}`)
    console.log(`processedResult display ${processedResult.display}`)

    console.log(`cue data spread ${cueData.display}`)

     //TODO: run evaluation function to compare processed result with current cue (cue needs to be sent from the front end) 

  }


  // if (stream.results[0].isFinal == true) {
  //   //send signal to stop recordRTC
  //   socket.emit("killRecorder", "kill recorder");

  //   socket.emit("startProcessing", words) 
  // }
}

let recognizeStream = client
.streamingRecognize(request)
.on('error', err => {
  if (err.code === 11) {
    // restartStream();
  } else {
    console.error('API request error ' + err);
  }
})
.on("data", speechCallback);


  socket.on("start_speech", (data) => {
    console.log('data received ', data)
  })

  socket.on("incoming_stream", (audio) => {
    // console.log(`incoming stream ${audio}`)
    recognizeStream.write(audio);

  });

})


server.listen(3001, () => {
    console.log('server is running local host 3001')
})
