import React, {useContext, useRef, useState, useEffect} from 'react'
import ControlsMessage from './ControlsMessage'
import styles from './ControlsContainer.module.css'
import SessionButton from '../SessionButton/SessionButton'


import SessionBtnContainer from '../SessionButton/SessionBtnContainer'


const ControlsContainer = (props) => {
  // let currentSessionState = {...props.currentSessionState}

  const setSession = props.setSession;
  const setListeningState = props.setIsListening;

  const [instructionsText, setInstructionsText] =useState('Click Go to load a sentence for reading.')

  useEffect (()=> {
    props.currentSessionState ==='start' && setInstructionsText('When you are ready to read the sentence aloud, click Start.');
    props.currentSessionState ==='listen' && setInstructionsText('Click Cancel to end the session');
    
    
  },[props.currentSessionState])



  return (

    <div className={styles['controls-container']}>
      {instructionsText}
     <SessionButton 
     setSessionState={props.setSessionState}
     currentSessionsState = {props.currentSessionState} 
     setIsListening={props.setIsListening}
     />
   

    </div>
  )
}

export default ControlsContainer