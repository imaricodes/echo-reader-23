//https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s
const express = require('express')
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require('cors')

//TODO: connect socket io to frontend (this is for the audio stream)

// app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        orgin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
} )

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)



    socket.on("recorder_started",(data) => {
        console.log(`${JSON.stringify(data)} from ${socket.id}`)

        setTimeout( () =>{
            socket.emit("stop_recorder", "stop recorder")
        }, 2000)
       
    })

    socket.on("recorder_stopped", (data) => {
        console.log(data)
    })
})

server.listen(3001, () => {
    console.log('server is running local host 3001')
})