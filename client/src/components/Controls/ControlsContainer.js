import React, {useContext} from 'react'
import ControlsMessage from './ControlsMessage'
import styles from './ControlsContainer.module.css'
import SessionButton from '../SessionButton/SessionButton'


import SessionBtnContainer from '../SessionButton/SessionBtnContainer'


const ControlsContainer = (props) => {
  // let currentSessionState = {...props.currentSessionState}

  let handleClick = () => {

    //check current session state

    //either update current session state or button state
    console.log('current parent session state prop ', props.currentSessionState)
    props.setSession('start')
  }
  return (


    <div className={styles['controls-container']}>
     CONTROLS CONTAINER
     <SessionButton/>
     <button
       
       className={`
 
 ${styles["btn"]} 
 ${styles["btn--green"]}
 ${styles["btn--circle"]}
 `}
       onClick={handleClick}
     >
       Go
     </button>

    </div>
  )
}

export default ControlsContainer