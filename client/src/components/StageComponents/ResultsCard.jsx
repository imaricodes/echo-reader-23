import React, {useState, useEffect, useRef} from 'react'
import { displayResponses } from '../../js/displayUtilities'

const ResultsCard = (props) => {
const sessionResult = props.sessionResult
console.log(`sess `, sessionResult)

  const resultDisplayRef = useRef()

  // useEffect( () => {
  //   // displayResponses(sessionResults)
    
  //   console.log('result card use effect fired')

  // }, [sessionResults])
  
  return (
    <div className='result-card'>
      {/* <div ref={resultDisplayRef}>

      </div> */}
      
    </div>
  )
}

export default ResultsCard