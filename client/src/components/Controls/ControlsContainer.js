import React, {useContext} from 'react'
import ControlsMessage from './ControlsMessage'
import styles from './ControlsContainer.module.css'
import SessionButton from '../SessionButton/SessionButton'


import SessionBtnContainer from '../SessionButton/SessionBtnContainer'


const ControlsContainer = () => {
  return (


    <div className={styles['controls-container']}>
     CONTROLS CONTAINER
      <SessionButton/>

    </div>
  )
}

export default ControlsContainer