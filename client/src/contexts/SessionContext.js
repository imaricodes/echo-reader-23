import React, {createContext, useState} from "react";


export const SessionContext = createContext();

export const SessionContextProvider = (props) => {
// possible sessionStates: start, go, stop, reset
  const [sessionState, setSessionState] = useState('go')

    return (
      <SessionContext.Provider value={[sessionState, setSessionState]}>
        {props.children}
      </SessionContext.Provider>
    );
};