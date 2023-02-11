//https://www.youtube.com/watch?v=djMy4QsPWiI&t=1s


import React from 'react'
import {useState,useEffect} from 'react';
import { processCue, processResponse } from "./js/processes";
import Header from './components/Header';
import ControlsContainer from './components/Controls/ControlsContainer';
import Stage from './components/Stage/Stage';
import { SessionContextProvider } from './contexts/SessionContext';



function App() {


    return (
      
        
        <SessionContextProvider>
            <Header/>
            <ControlsContainer/>
            <Stage/>

            {/* <button onClick={run}>button</button> */}
        </SessionContextProvider>
       
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
