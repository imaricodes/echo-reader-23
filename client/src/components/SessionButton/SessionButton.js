import React, {useContext, useState, useEffect} from 'react'
import styles from './SessionButton.module.css'
import { SessionContext } from '../../contexts/SessionContext'

const SessionButton = (props) => {

//  const sessionButtonText = "go"
  // const [sessionState, setSessionState] = useContext(SessionContext)

  const [buttonState, setButtonState] = useState('go')
  const [buttonText, setButtonText] =  useState('Go')
  // let buttonText = "Go"
useEffect(() => {
  buttonState === 'go' && setButtonText('Go')
  buttonState === 'start' && setButtonText('Start')
  buttonState === 'listen' && setButtonText('Stop')
  buttonState === 'stop' && setButtonText('Start')
  // setButtonText('Start')
  console.log(`button text ${buttonText}`)

})



  let updateButtonText = (buttonState) => {
    console.log(`update in progress`)
    // switch (buttonState) {
      
    //   case "start":
    //     setButtonText('Start')
    //     console.log(`button TEXT ${buttonText}`)
    //     // setSessionState('reading');
    //     break;
    //     case "reading":
    //       // setButtonText("Cancel");
          
          
    //       break;
    //       case "speaking":
    //         // setSessionState('go');
    //         // setButtonText("Go");
    //         break;
    //       }
          
          
  }

  let handleClick = () => {
    buttonState === "go" && setButtonState('start')
    buttonState === "start" && setButtonState('listen')
    buttonState === "listen" && setButtonState('go')
  
   
    
  }
  return (

  <div>
    <button 


    
    className={`
    ${styles['btn']} 
    ${styles['btn__sessionbtn--color--green']}
    ${styles['btn--circle']}
    ${buttonState === 'listen' ? `${styles['btn__sessionbtn--color--red']}` : ""}
    ${buttonState === 'stop' ? `${styles['btn__sessionbtn--color--red']}` : ""}
    `
  }

    onClick ={handleClick}
   
>
 {buttonText}
</button>

  </div>
    
  )
}

export default SessionButton