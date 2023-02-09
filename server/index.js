//EXPRES SERVER SETUP https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s
const express = require('express')
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require('cors')




app.use(cors());
/** CREATE SERVER */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        orgin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
} )



// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
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

  console.log(`connected with user id ${socket.id}`)


const speechCallback = (stream) => {
  //TODO: set timeout in case final transcript does not arrive
  console.log('SPEECH CALLBACK CALLED')
  let words = stream.results[0].alternatives[0].transcript;
  let wordsArray = words.split(" ");
  console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);
  // console.log("FINAL TRANSCRIPT: ", words);
  // console.log("word array length ", wordsArray.length);
  console.log(JSON.stringify(wordsArray));

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
