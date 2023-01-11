//https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s


import React from 'react'
import io from 'socket.io-client';
import {useState,useEffect} from 'react';
import { startWebMic } from './js/recorder';

// import {startWebMic} from './js/recorder'












function App() {
const run = () => {
    const socket = io.connect("http://localhost:3001")

    if (socket) {
        // console.log('client id ', socket)
        startWebMic(socket)
    }

}



return (

    <div>
   <button onClick={run}>button</button>


  
    </div>

)


}




export default App;




// /** START TUTORIAL CODE */


// //Room State
// const [room, setRoom] = useState("")

//  //messages states 
// const[message, setMessage] = useState("")
// const[messageReceived, setMessageReceived] = useState("")

// const joinRoom = () => {
//   if (room !=="") {
//     socket.emit("join_room", room)
    
//   }
// }

// const sendMessage = () => {
//   socket.emit('send_message', {
//     message,room
//   })
// }

// useEffect( ()=> {
//   socket.on("receive_message", (data) => {
//     setMessageReceived(data.message)
//   })
// }, [socket])


//   return (
//     <div className="App">
//       <input 
//       placeholder="Room Number..."
//       onChange= {(event) => {
//         setRoom(event.target.value)
//       }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input 
//       placeholder='Message'
//       onChange= {(event) => {
//         setMessage(event.target.value)
//       }}
//       />
//       <button onClick={sendMessage}>SEND MESSAGE</button>
//       <h1> Message:</h1>
//       {messageReceived}
//     </div>
//   );
// /** END TUTORIAL CODE */
