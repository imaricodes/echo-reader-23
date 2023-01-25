//https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s
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
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  config,
  interimResults: true,
};

let recognizeStream = null;


const speechCallback = () => {
  let words = stream.results[0].alternatives[0].transcript;
  let wordsArray = words.split(" ");
  console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);
  console.log("FINAL TRANSCRIPT: ", words);
  console.log("word array length ", wordsArray.length);
  console.log(JSON.stringify(wordsArray));

  // if (stream.results[0].isFinal == true) {
  //   //send signal to stop recordRTC
  //   socket.emit("killRecorder", "kill recorder");

  //   socket.emit("startProcessing", words) 
  // }
}




/**
 * Calls the Speech-to-Text API on a demo audio file.
 */

io.on("connection", (socket) => {
  console.log(`user id ${socket.id}`)

  socket.on("start_speech", (data) => {
    console.log('data received ', data)
  })

  socket.on("audioStream", (audio) => {
    console.log(`audiostream data ${audio}`)
    recognizeStream = client
    .streamingRecognize(request)
    .on('error', err => {
      if (err.code === 11) {
        // restartStream();
      } else {
        console.error('API request error ' + err);
      }
    })
    .on('data', speechCallback);
  
  
    recognizeStream.write(audio);
  });


})





server.listen(3001, () => {
    console.log('server is running local host 3001')
})







/** STASH 1 */


// const speech = require("@google-cloud/speech");

// const encoding = "LINEAR16";
// const sampleRateHertz = 16000;
// const languageCode = "en-US";
// const streamingLimit = 5000;

// const client = new speech.SpeechClient();






// const config = {
//   encoding: encoding,
//   sampleRateHertz: sampleRateHertz,
//   languageCode: languageCode,
//   enableAutomaticPunctuation: false,
//   single_utterance: true,
// };

// const request = {
//   config,
//   interimResults: true,
// };


// //this is not needed speech callback instantiated  in processClient function
// // const speechCallback = (stream) => {
// //   let words = stream.results[0].alternatives[0].transcript;
// //   let wordsArray = words.split(" ");
// //   console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);
// //   console.log("FINAL TRANSCRIPT: ", words);
// //   console.log("word array length ", wordsArray.length);
// //   console.log(JSON.stringify(wordsArray));

// //   if (stream.results[0].isFinal == true) {
// //     //send signal to stop recordRTC
// //     io.emit("killRecorder", "kill recorder");


// //     /** 
// //      * initiate language processing on client, send final result
// //      * client will send command to kill cloud speech
// //      */
// //     // io.emit("startProcessing", words)
// //     io.emit("startProcessing", words)
    
// //   }

// //   // if (wordsArray.length === 2) {
// //   //   console.log('max words reached')
// //   //   recognizeStream.end()
// //   //   //send signal to stop recordRTC
// //   //   // io.emit("killRecorder", "kill recorder");

// //   //   //initiate language processing on client
// //   //   // io.emit("startProcessing", words)
// //   // }


  
// //   console.log("TRANSCRIPT: ", words);
// //   // process.stdout.write(words);
// //   process.stdout.clearLine();
// //   process.stdout.cursorTo(0);

// // };


// //handle new connection for testing
// let procesClientTesting = (socket) => {
//   const words = "ghis! is, Sentence."
//   socket.emit("killRecorder", "kill recorder");
//   socket.emit("startProcessing", words) 
// }

// //handle new connection
// let processClient = (socket) => {

//   const speechCallback = (stream) => {
//     let words = stream.results[0].alternatives[0].transcript;
//     let wordsArray = words.split(" ");
//     console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);
//     console.log("FINAL TRANSCRIPT: ", words);
//     console.log("word array length ", wordsArray.length);
//     console.log(JSON.stringify(wordsArray));
  
//     if (stream.results[0].isFinal == true) {
//       //send signal to stop recordRTC
//       socket.emit("killRecorder", "kill recorder");
  
//       socket.emit("startProcessing", words) 
//     }
//   }

  
//   let recognizeStream = client
//   .streamingRecognize(request)
//   .on("error", (err) => {
//     if (err.code === 11) {
//       // restartStream();
//     } else {
//       console.error("API request error " + err);
//     }
//   })
//   .on("data", speechCallback);

//   console.log("connected with id: ", socket.id);

  
//   socket.on("audioStream", (audio) => {
//     recognizeStream.write(audio);
//   });


//   socket.on("killSpeechClient", (message) => {
//     console.log(message)
//     if (recognizeStream) {
//       console.log('ENDING SPEECH CLIENT...')
//       recognizeStream.end()
//       recognizeStream = null;
//       console.log('SPEECH CLIENT NULLED:  ', recognizeStream)
//       socket.disconnect()
//     } else {console.log('CLIENT ALREADY NULL')} 
    
//   })
// }

// let socketsActive = []

// io.on("connection", (socket) => {

//   console.log("connected with FRESH id: ", socket.id);

// //if socket id does not exist, add socket id to array of ids
// //need a process here that takes the socket
// socketsActive.push(socket.id)

  
//   console.log(`socketActive array ${JSON.stringify(socketsActive)}`)
//   console.log(`socketActive array length ${JSON.stringify(socketsActive.length)}`)
  
//   processClient(socket)
//   // procesClientTesting(socket)

// });




















/** STASH 2 */


// const encoding = "LINEAR16";
// const sampleRateHertz = 16000;
// const languageCode = "en-US";
// const streamingLimit = 5000;

// const config = {
//   encoding: encoding,
//   sampleRateHertz: sampleRateHertz,
//   languageCode: languageCode,
//   enableAutomaticPunctuation: false,
//   single_utterance: true,
// };

// const request = {
//   config,
//   interimResults: true,
// };

// let recognizeStream

// const client = new speech.SpeechClient();
// console.log(`client ${client._streamingRecognize}`)

// /** START PASTED FROM GLOUD */

// //handle new connection
// const speechCallback = (stream) => {

//   console.log('speech callback called')
//   let words = stream.results[0].alternatives[0].transcript;
//   let wordsArray = words.split(" ");
//   console.log("FINAL TRANSCRIPT? :", stream.results[0].isFinal);
//   console.log("FINAL TRANSCRIPT: ", words);
//   console.log("word array length ", wordsArray.length);
//   console.log(JSON.stringify(wordsArray));

//   if (stream.results[0].isFinal == true) {

//     socket.emit("killRecorder", "kill recorder");

//     socket.emit("startProcessing", words) 
//   }
// }


// io.on("connection", (socket) => {

//   console.log("connected with FRESH id: ", socket.id);




  

//   recognizeStream = client
//   .streamingRecognize(request)
//   .on("error", (err) => {
//     if (err.code === 11) {
//       // restartStream();
//     } else {
//       console.error("API request error " + err);
//     }
//   })
//   .on("data", speechCallback);

//   socket.on("here_comes", data => {
//     console.log(`data ${data}`)
//   })

//   socket.on("audioStream", (audio) => {

//     recognizeStream.write(audio);
//   });


// });



/** END PASTED FROM GLOUD */






