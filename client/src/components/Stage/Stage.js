import React, {useContext, useEffect} from 'react'
import styles from './Stage.module.css'
import { SessionContext } from '../../contexts/SessionContext'
import CueSentenceCard from '../StageComponents/CueSentenceCard'
import StageStartCard from '../StageComponents/StageStartCard'
import ResultsCard from '../StageComponents/ResultsCard'


const Stage = () => {

  const [sessionState, setSessionState] = useContext(SessionContext)
  //TODO: relying on this context state is causing too many re-renders, devise alternate way for session button and stage components to interact
  useEffect(()=>{
    console.log(`from stage session state ${sessionState}`)
  },[setSessionState])


  if (sessionState === "reading" || sessionState=== "speaking") {
    return (
      <div className={styles['stage']}>
        <CueSentenceCard/>
      </div>
    )
  }

  if (sessionState === "go") {
    return (
      <div className={styles['stage']}>
        <StageStartCard/>
      </div>
    )
  }


  
}

export default Stage