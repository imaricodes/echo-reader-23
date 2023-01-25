import {io} from '../index'

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