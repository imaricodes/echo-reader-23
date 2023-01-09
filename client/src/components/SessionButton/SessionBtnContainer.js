import React from 'react'
import styles from './SessionBtnContainer.module.css'
import SessionButton from './SessionButton'

const SessionBtnContainer = () => {
//capture state of button on click, go >> [loop: start >> reset >> start]


  return (
    <div>

      <SessionButton>Go</SessionButton>
    </div>
  )
}

export default SessionBtnContainer