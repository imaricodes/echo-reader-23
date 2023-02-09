import React from "react";
import styles from './CardStageMessage.module.css'

const CardStageMessage = (props) => {
  return (


    <div className={styles['card-stage__message']}>
        {props.children}
    </div>

  )
};

export default CardStageMessage;
