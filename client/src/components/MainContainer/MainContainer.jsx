import React, {useState, useRef} from 'react'
import Header from '../Header'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import { SessionContextProvider } from '../../contexts/SessionContext'

const MainContainer = () => {

const [sessionState, setSessionState] = useState('go');
// console.log('current parent session sate ', sessionState)


  return (
    <SessionContextProvider>
        <div className='main-container'>
      
    <ControlsContainer setSession = {setSessionState} currentSessionState={sessionState}/>
    <Stage currentSessionState = {sessionState}/>
        </div>
</SessionContextProvider>
  )
}

export default MainContainer