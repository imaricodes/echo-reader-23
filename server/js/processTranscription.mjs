const regexRemovePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

let normalizeArrayLength = (maxWords, responseArray) => {
  if (maxWords === responseArray.length) {
    return responseArray;
  } else if (maxWords > responseArray.length) {
    //response is shorter than cue, add empty strings
    let difference = maxWords - responseArray.length;
    let index = 0;
    for (index; index < difference; index++) {
      responseArray.push("x");
    }
    return responseArray;
  } else if (maxWords < responseArray.length) {
    //response is longer than cue, truncate
    let difference = responseArray.length - maxWords;
    let slicedArray = responseArray.slice(0, -difference);
    return slicedArray;
  }
};

const formatSentenceToDisplay = (responseNoPunctuation, maxWords) => {
  let arrNormalized = [];
  let arr = responseNoPunctuation.split(" ");

  //if arr length is greater than cue sentence length
  if (arr.length > maxWords || arr.length < maxWords) {
    arrNormalized = normalizeArrayLength(maxWords, arr);
  } else arrNormalized = [...arr];

  let arrFinal = arrNormalized.map((word, index) => {
    if (index === 0) {
      //capitalize first letter word
      const str = word;
      const strCapitalized = str.charAt(0).toUpperCase() + str.slice(1);
      return strCapitalized;
    }

    //if at last word in array and it is 'x'
    if (index === arrNormalized.length - 1 && arrNormalized[index] === "x") {
      return word;
    }

    if (index === arrNormalized.length - 1 && arrNormalized[index] !== "x") {
      let result = word + ".";
      return result.toLowerCase();
    }

    if (index > 0) {
      return word.toLowerCase();
    }
  });

  return arrFinal;
};

export function processResponse(response, maxWords) {
  let responseNoPunctuation = response.replace(regexRemovePunctuation, "");

  let responseFormatted = formatSentenceToDisplay(
    responseNoPunctuation,
    maxWords
  );

  let sentenceToDisplay = responseFormatted;

  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  let responseEvaluateLowerCased = response.replace(regex, "").toLowerCase();

  let responseEvaluateArray = responseEvaluateLowerCased.split(" ");
  //   let responseEvaluateArray = response.replace(regex, "").split(" ");

  // console.log(`response evaluate array ${responseEvaluateArray}`);

  //normalize sentence to display length match cue array length
  let sentenceToEvaluateArray = normalizeArrayLength(
    maxWords,
    responseEvaluateArray
  );

  return {
    display: sentenceToDisplay, //array

    evaluate: sentenceToEvaluateArray, //array
  };
}

