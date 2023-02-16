import React, {useRef, useEffect} from 'react'


const CueSentenceCard = (props) => {

  const cuePresentationContainerRef = useRef();

  useEffect(()=> {

    if (cuePresentationContainerRef.current.childNodes.length===0) {
    let newDiv = document.createElement("div");
      newDiv.classList.add("cue");
      newDiv.innerText = props.cue;
      cuePresentationContainerRef.current.appendChild(newDiv);
    }
   
  },[])


  return (
    <div ref={cuePresentationContainerRef}></div>
  )
}

export default CueSentenceCard