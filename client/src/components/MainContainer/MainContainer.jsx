import React, {useState, useRef} from 'react'
import Header from '../Header'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import { SessionContextProvider } from '../../contexts/SessionContext'

const MainContainer = () => {

const [sessionState, setSessionState] = useState('go');
const [isListening, setIsListening] = useState(false);
// console.log('current parent session sate ', sessionState)



  return (
    <SessionContextProvider>
        <div className='main-container'>
      
          <ControlsContainer 
          setSessionState = {setSessionState} 
          currentSessionState={sessionState} 
          setIsListening = {setIsListening}
          />

          <Stage 
          setSession = {setSessionState} 
          currentSessionState = {sessionState} 
          isListengingState = {isListening}
          />

        </div>
</SessionContextProvider>
  )
}

export default MainContainer