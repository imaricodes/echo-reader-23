const regexRemovePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export function processCue(cue) {
 
    let sentenceToDisplay = cue.split(" ");
  
    let sentenceNoPunctuation = cue
      .replace(regexRemovePunctuation, "")
      .toLowerCase();
  
    let sentenceToEvaluateArray = sentenceNoPunctuation.split(" ");
  
     console.log(`evalutate array ${sentenceToEvaluateArray}`)
    return {
      display: sentenceToDisplay, //array
      evaluate: sentenceToEvaluateArray, //array
    };
  }