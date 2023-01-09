import React from 'react'
import styles from './CardStage.module.css'
import CardStageMessage from './CardStageMessage'

const CardStage= () => {
  return (
    <div className={styles['card-stage']}>
      <CardStageMessage>Welcome to here</CardStageMessage>
    
    </div>
  )
}

export default CardStage