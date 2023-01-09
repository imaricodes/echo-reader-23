import React from 'react'
import ControlsMessage from './ControlsMessage'
import styles from './Controls.module.css'
import StudentReadImg from '../StudentReadImg.js'
import SessionBtnContainer from '../SessionButton/SessionBtnContainer'


const Controls = () => {
  return (
    <div className={styles['controls']}>
      <StudentReadImg/>
      {/* <ControlsMessage/> */}
      <SessionBtnContainer/>

    </div>
  )
}

export default Controls