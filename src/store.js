import React from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import reducerAnecdote, { initializeAnecdotes } from './reducers/anecdoteReducer'
import reducerNotif from './reducers/notificationReducer'
import reducerBlog from './reducers/blogReducer'
import reducerUser from './reducers/userReducer'
import thunk from 'redux-thunk'
// import filterReducer from './reducers/filterReducer'

 const reducer = combineReducers(
  {stateblog: reducerBlog,
  statenotif: reducerNotif,
  stateuser: reducerUser}
  //statefilter: filterReducer
 )
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

/* anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
) */

//export const storeNotif = createStore(reducerNotif)

//composeWithDevTools(applyMiddleware(thunk))  //redux-devtools-extension

export default store