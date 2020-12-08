import React from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import reducerAnecdote, { initializeAnecdotes } from './reducers/anecdoteReducer'
import reducerNotif from './reducers/notificationReducer'
import thunk from 'redux-thunk'
/* import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes' */

 const reducer = combineReducers(
  //anecdotes: reducerAnecdote,
  {statenotif: reducerNotif}
  //statefilter: filterReducer
 )
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

/* anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
) */

//export const storeNotif = createStore(reducerNotif)

//composeWithDevTools(applyMiddleware(thunk))  //redux-devtools-extension

export default store