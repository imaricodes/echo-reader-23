let cardStage = document.getElementById("card-stage");
// let showResult = document.getElementById("displayResult");
// let showCue = document.getElementById("displayCue");
let mainWrapper = document.querySelector(".main-wrapper");

//grid font size handler
//add observer to response container

//Create elements and display responses

export const testDisplayAppend = (sessionResults, resultDisplayRef) => {
  const length = sessionResults[0].length;

  /**
   * THIS SECTION DYNAMICALLY CREATES A GRID ELEMENT AND APPENDS IT TO A DIV ELEMENT IN THE COMPONENET
   */
  let responseContainer = document.createElement("div");
  responseContainer.classList.add("response-container");

  let responseContainerGrid = document.createElement("div");
  responseContainerGrid.classList.add("result-grid-container");
  //dynamically set grid template columns
  responseContainerGrid.style[
    "grid-template-columns"
  ] = `repeat(${length}, auto)`;

  responseContainer.append(responseContainerGrid);

  //Append grid to component element
  resultDisplayRef.current.append(responseContainer);

  /**
   * THIS SECTION DYNAMICALLY CREATES GRID ITEMS FROM RESPONSES IN SESSION RESULTS OBJECT AND ADDS THEM TO THE GRID CREATED ABOVE
   */
    //append cue result card ref
    for (let i = 0; i < length; i++) {
      const newDiv = document.createElement("div");
  
      //add general class to new div (this works)
      newDiv.classList.add("word-cue");
      newDiv.classList.add("grid-item");
  
      const word = document.createTextNode(sessionResults[0 + 1][i]);
  
      newDiv.appendChild(word);
  
      const parentDiv = document.querySelector(".result-grid-container");
  
      //append div that contains res words to the grid container
      parentDiv.appendChild(newDiv);
    }

  /**
   * THIS SECTION DYNAMICALLY CREATES GRID ITEMS FROM CUE IN SESSION RESULTS OBJECT AND ADDS THEM TO THE GRID CREATED ABOVE
   */
      //append res to result card ref
  for (let i = 0; i < length; i++) {
    const newDiv = document.createElement("div");

    //add general class to new div (this works)
    newDiv.classList.add("word-res");
    newDiv.classList.add("grid-item");

    if (sessionResults[i + 2].match === "false") {
      newDiv.classList.add("false");
    }

    //add id to new div, is this necessary? Probably not
    // newDiv.id = `res-${i}`
    console.log(`current word: `,sessionResults[i + 2].responseDisplayWord )
    //this will be content from sessionResults
    const word = document.createTextNode(
      sessionResults[i + 2].responseDisplayWord
    );

    newDiv.appendChild(word);

    const parentDiv = document.querySelector(".result-grid-container");

    //append div that contains res words to the grid container
    parentDiv.appendChild(newDiv);

  }

  
};

export const displayResponses = (sessionResults) => {
  console.log(`running display response`);
  const length = sessionResults[0].length;

  //create response container (grid template columns)
  let responseContainer = document.createElement("div");
  responseContainer.classList.add("response-container");

  let responseContainerGrid = document.createElement("div");
  responseContainerGrid.classList.add("result-grid-container");
  //dynamically set grid template columns
  responseContainerGrid.style[
    "grid-template-columns"
  ] = `repeat(${length}, auto)`;
  // responseContainer.setAttribute("id", "response-container");

  responseContainer.append(responseContainerGrid);

  //append grid container to componenet element
  cardStage.append(responseContainer);

  //append cue result card ref
  for (let i = 0; i < length; i++) {
    const newDiv = document.createElement("div");

    //add general class to new div (this works)
    newDiv.classList.add("word-cue");
    newDiv.classList.add("grid-item");

    const word = document.createTextNode(sessionResults[0 + 1][i]);

    newDiv.appendChild(word);

    const parentDiv = document.querySelector(".result-grid-container");

    //append div that contains res words to the grid container
    parentDiv.appendChild(newDiv);
  }

  //append res to result card ref
  for (let i = 0; i < length; i++) {
    const newDiv = document.createElement("div");

    //add general class to new div (this works)
    newDiv.classList.add("word-res");
    newDiv.classList.add("grid-item");

    if (sessionResults[i + 2].match === "false") {
      newDiv.classList.add("false");
    }

    //add id to new div, is this necessary? Probably not
    // newDiv.id = `res-${i}`

    //this will be content from sessionResults
    const word = document.createTextNode(
      sessionResults[i + 2].responseDisplayWord
    );

    newDiv.appendChild(word);

    const parentDiv = document.querySelector(".result-grid-container");

    //append div that contains res words to the grid container
    parentDiv.appendChild(newDiv);

    //get current main wrapper width
    let mainWrapperDimensions = window.getComputedStyle(mainWrapper).width;
    // console.log(`computed width main wrapper: ${mainWrapperDimensions}`);

    //get current grid container width
    let responseContainerDimensions =
      window.getComputedStyle(responseContainer).width;
    // console.log(`computed width response container : ${responseContainerDimensions}`);
    //adjust grid font size
  }

  let ro = new ResizeObserver((entries) => {
    // console.log(`entries ${JSON.stringify(entries)}`)
    // console.log(JSON.stringify(entries))

    // console.log(entries[0].target)
    // console.log(entries[0].contentRect.width)
    // console.log(entries[1].target)
    // console.log(entries[1].contentRect.width)

    let mainWrapperWidth = entries[0].contentRect.width;
    // let cardStageWidth = entries[1].contentRect.width

    // let percentDiff = (((mainWrapperWidth - cardStageWidth) / cardStageWidth) * 100)
    // console.log(`percent diff:  ${percentDiff}%`)

    let responseContainerWidth = responseContainer.clientWidth;
    console.log(`responseContainerWidth ${responseContainerWidth}`);

    let responseGridWidth = document.querySelector(
      ".result-grid-container"
    ).clientWidth;
    console.log(`responseGridWidth ${responseGridWidth}`);

    let mainGridDiff = mainWrapperWidth - responseGridWidth;
    console.log(`mainGridDiff ${mainGridDiff}`);

    if (mainGridDiff < 147) {
      console.log("time to change");
      let resultGridContainer = document.querySelector(
        ".result-grid-container"
      );
      resultGridContainer.style["font-size"] = `1.5rem`;
    }

    // console.log(entries[2].target)
    // console.log(entries[2].contentRect.width)
    // for (let entry of entries) {
    //   console.log(entry.contentRect.width)
    //   console.log(entry.target)
    // }
    // for (let entry of entries) {
    //   // const cr = entry.contentRect;
    //   // console.log('Element:', entry.target);
    //   // console.log(`Element size: ${cr.width}px x ${cr.height}px`);
    //   // console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);

    //   const respContainer = entry.target.querySelector(".response-container");
    //   let widthMain = Math.floor(entry[0].contentRect.width);
    //   let widthStage = Math.floor(entry[1].contentRect.width);
    //   // let height = Math.floor(entry.contentRect.height);

    //   console.log(`widthMain ${widthMain}`)
    //   console.log(`widthStage ${widthStage}`)

    //   let  mainWrapperWidth = window.getComputedStyle(mainWrapper).width;
    //   // console.log(`observed width main wrapper: ${mainWrapperWidth}`);
    //   // console.log('observed width response container: ', width)

    //   let responseContainerDimensions = window.getComputedStyle(responseContainer).width;
    //   // console.log(`computed width response container : ${responseContainerDimensions}`);

    //   // if (responseContainerDimensions < mainWrapperWidth) {
    //   //   console.log('smaller now')}

    //   //   if (responseContainerDimensions > mainWrapperWidth) {
    //   //     console.log('bigger now')

    //   // }

    // }
  });

  // Observe one or multiple elements
  ro.observe(mainWrapper);
  ro.observe(cardStage);
  // ro.observe(responseContainerGrid);
};

//get current cardstage dimensions:

//set font size with observer

//Create elements and display cue words

export let displayCue = (processedCue) => {
  const cueArray = processedCue.display.map((item) => item);

  // console.dir(`HAM ${cueArray}`)

  const length = cueArray.length;

  //create cue container
  let cueContainer = document.createElement("div");
  cueContainer.classList.add("cue-container");
  cueContainer.setAttribute("id", "cue-container");
  cardStage.append(cueContainer);

  for (let i = 0; i < length; i++) {
    const newDiv = document.createElement("div");

    //add general class to new div (this works)
    newDiv.classList.add("word-cue");

    const word = document.createTextNode(processedCue.display[i]);

    newDiv.appendChild(word);

    const parentDiv = document.getElementById("cue-container");

    //append div that contains word
    parentDiv.appendChild(newDiv);

    // cardStage.appendChild(parentDiv)
  }
};
