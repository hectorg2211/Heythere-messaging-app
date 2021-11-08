import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(); // The context is where the data lives

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); // Pull information from the data layer
