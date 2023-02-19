export const checkForMaxWords = (arr, maxWords) => {
  if (arr.length > maxWords) {
    console.log("MAX WORDS REACHED");
    console.log(`current array length: ${arr.length}`);

    // terminateAssemblySession();
    // closeSocket();
    return true;
  } else {
    console.log("MAX WORDS NOT REACHED");
    return false;
  }
};

//this function returns an array of objects
export const evaluateSession = (cueObj, responseObj) => {
  //compare strings index and return t/f for match
  const compareStrings = (a, b) => {
    let result;

    result = a === b;

    if (result === true) {
      // console.log(`compared true`);
    } else {
      // console.log(`compared false`);
    }
    return result;
  };

  let cueEvaluate = cueObj.evaluate.map((item) => item);
  let cueDisplay = cueObj.display.map((item) => item);

  let responseEvaluate = responseObj.evaluate.map((item) => item);
  let responseDisplay = responseObj.display.map((item) => item);

  let arr = [];
  arr.push(responseDisplay);
  arr.push(cueDisplay);

  for (const [index, name] of cueEvaluate.entries()) {
    // console.log(
    //   `cue evaulate array index:  ${cueEvaluate[index]} , ${responseEvaluate[index]}`
    // );
    let cue = cueEvaluate[index];
    let response = responseEvaluate[index];
    let match = "";

    let evaluation = compareStrings(cue, response);
    evaluation ? (match = "true") : (match = "false");

    arr.push({
      cueWord: cue,
      responseWord: response,
      match: match,
      responseDisplayWord: responseDisplay[index],
    });
  }
  // console.log(`evaluated array of objects!: ${JSON.stringify(arr)}`);
  return arr;
};



export const calculateTimeOut = (startSessionTime, maxSessionTime) => {
  let endTime = Date.now();
  let elapsedSessionTime = (endTime - startSessionTime) / 1000;
  let result = false;
  console.log("elapsed session time", elapsedSessionTime);

  if (elapsedSessionTime >= maxSessionTime) {
    result = true;
    // console.log('TIMED OUT!, close session and socket', result)
    // terminateAssemblySession();
    // closeSocket();
    return result;
  } else {
    return result;
  }
};
