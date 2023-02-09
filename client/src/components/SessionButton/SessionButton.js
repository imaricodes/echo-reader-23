import React, {useContext, useState} from 'react'
import styles from './SessionButton.module.css'
import { SessionContext } from '../../contexts/SessionContext'

const SessionButton = (props) => {

  const [sessionState, setSessionState] = useContext(SessionContext)

  const [buttonText, setButtonText] = useState('Go')

  let updateButtonText = (sessionState) => {
    // console.log(`from button session state ${sessionState}`)
    switch (sessionState) {

      case "go":
        setButtonText("Start");
        setSessionState('reading');
        break;
      case "reading":
        setButtonText("Cancel");
       
        
        break;
      case "speaking":
        setSessionState('go');
        setButtonText("Go");
        break;
 
    }

  }

  let handleClick = () => {
    console.log('hadle click fired')
    
    updateButtonText(sessionState)
    
  }
  return (

  <div>
    <button className={`
    
    ${styles['btn']} 
    ${styles['btn--green']}
    ${styles['btn--circle']}
    `}

    onClick ={handleClick}
   
>
 {buttonText}
</button>

  </div>
    
  )
}

export default SessionButton