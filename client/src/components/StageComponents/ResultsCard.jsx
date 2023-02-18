import React, {useState, useEffect, useRef} from 'react'
import { displayResponses, testDisplayAppend } from '../../js/displayUtilities'
import styles from './ResultsCard.module.css'

const ResultsCard = (props) => {
const sessionResult = props.sessionResult

const [displayData, setDisplayData]=useState(sessionResult)


  const resultDisplayRef = useRef()



  const length = displayData[0].length;

  let displayGridItems = (displayData) => {
    let elements = [];

    //append cue result card ref
    for (let i = 0; i < length; i++) {
      const word = displayData[0 + 1][i];
      elements.push(
        React.createElement("div", { className: `${styles['grid-item']} ${styles['word-cue']}` }, word)
        
      );
    }

    //append res to result card ref
    for (let i = 0; i < length; i++) {
      let word = "";
      let matchStatus = "true";

      if (displayData[i + 2].match === "false") {
        matchStatus = "false";
      }

      word = displayData[i + 2].responseDisplayWord;

      elements.push(
        React.createElement(
          "div",
          { className: `${styles['grid-item']} ${styles['word-res']} ${styles[`${matchStatus}`]}` },
          word
        )
      );
    }

    return elements;
  }

  
 
  return (
    <div className='result-card'>
        <div style={{
        display: 'grid', 
        gridTemplateColumns:`repeat(${length}, auto)` }}
        >

          {
            displayGridItems(displayData).map((item) => item)
            }

      </div>
    </div>
  )
}

export default ResultsCard