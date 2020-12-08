import React from 'react'
import { useSelector } from 'react-redux'
//import reducerNotif from '../reducers/notificationReducer'

const Notification = () => {

  const notification  = useSelector(stateText => stateText.statenotif)
console.log('ja notification on:', notification.message)
    if ( !notification ) {
      return null
    }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: 'red',
    //color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {notification.message}
  </div>
}

export default Notification


