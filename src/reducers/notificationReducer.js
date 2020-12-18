import React from "react"
import store from "./../store"

var timerId

const reducerNotif = (stateNotif = '', action) => {
  console.log('action tope:', action.type)

  switch (action.type) {

    /* case 'SHOW_NEW_ADD': {
      return action.data.text
    } */
    case 'HIDE_NOTIF': {
      return ''
    }
    case 'SHOW_NEW': {
      console.log('NEW_VOTE, action.data:', action.data)
      return action.data.text
    }
    default: return stateNotif
  }
}

export const showNotification = (text) => {
  console.log('showNotification:', text)
  return async dispatch => {
    //clearTimeout(timerId)
    await dispatch(
      {
        type: 'SHOW_NEW',
        data: { text }
      }
    )

    timerId = setTimeout(() => {
      dispatch(
        {
          type: 'HIDE_NOTIF',
          data: ''
        }
      )
    }, 5000)

  }
}

export default reducerNotif
