//EXPRES SERVER SETUP https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handleStream } from "./js/googleSpeechAPI.mjs";


const app = express();

/** MIDDLEWARE */

app.use(cors());

/** CREATE SERVER */
const server = createServer(app);
const io = new Server(server, {
  cors: {
    orgin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log('server side socket id: ', socket.id)
  handleStream(socket);


  //enabled temporarily for testing
  // socket.on("incoming_stream", (audio) => {
  //   console.log(`stream coming`)
  //   socket.emit("close_media_recorder", "close_media_recorder")

  //   let sessionResult = [
  //       ["I", "like", "peanuts", "in", "my", "cereal."],
  //       ["I", "like", "peanuts", "in", "my", "cereal."],
  //       { cueWord: "i", responseWord: "i", match: "true", responseDisplayWord: "I" },
  //       {
  //         cueWord: "like",
  //         responseWord: "like",
  //         match: "true",
  //         responseDisplayWord: "like"
  //       },
  //       {
  //         cueWord: "peanuts",
  //         responseWord: "peanuts",
  //         match: "true",
  //         responseDisplayWord: "peanuts"
  //       },
  //       {
  //         cueWord: "in",
  //         responseWord: "in",
  //         match: "true",
  //         responseDisplayWord: "in"
  //       },
  //       {
  //         cueWord: "my",
  //         responseWord: "my",
  //         match: "true",
  //         responseDisplayWord: "my"
  //       },
  //       {
  //         cueWord: "cereal",
  //         responseWord: "cereal",
  //         match: "true",
  //         responseDisplayWord: "cereal."
  //       }
  //     ];

  //   socket.emit("results_processed", sessionResult)

    
  // });


});

server.listen(3001, () => {
  console.log("server is running local host 3001");
});
