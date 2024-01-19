// context.js
import React, { createContext, useContext, useReducer } from 'react'

const GlobalContext = createContext()

const initialState = {
  // Your initial state properties
  userData: null
}

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload }
    // Add more cases as needed
    default:
      return state
  }
}

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  const setUserData = userData => {
    dispatch({ type: 'SET_USER_DATA', payload: userData })
  }
  // Add more actions as needed

  return <GlobalContext.Provider value={{ state, setUserData /*, other actions */ }}>{children}</GlobalContext.Provider>
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}

export { GlobalProvider, useGlobalContext }
