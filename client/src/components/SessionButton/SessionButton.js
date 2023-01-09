import React from 'react'
import styles from './SessionButton.module.css'

const SessionButton = (props) => {
  return (
    // <button className={styles['btn', 'btn--green', 'btn--circle', 'btn--text', 'sessionButton' ]}>
    //     {props.children}
    // </button>
  
    <button className={`
    
        ${styles['btn']} 
        ${styles['btn--green']}
        ${styles['btn--circle']}
        `}
    >
        {props.children}
    </button>
  )
}

export default SessionButton