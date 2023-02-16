import React, {useEffect, useRef} from 'react'
import { displayResponses } from '../../js/displayUtilities'

const ResultsCard = (props) => {
  const sessionResults = props.sessionResult
  const resultDisplayRef = useRef()

  useEffect( () => {
    // displayResponses(sessionResults)
    
    console.log('result card use effect fired')

  }, [sessionResults])
  
  return (
    <div className='result-card'>
      <div ref={resultDisplayRef}>

      </div>
      ResultsCard
    </div>
  )
}

export default ResultsCard