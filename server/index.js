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

    socket.on("join_room", (data) => { 
        socket.join(data);

    })


    socket.on("send_message",(data) => {
        console.log(`data: ${JSON.stringify(data)} message from ${socket.id}`)

        socket.to(data.room).emit("receive_message", data)

    })
})

server.listen(3001, () => {
    console.log('server is running')
})