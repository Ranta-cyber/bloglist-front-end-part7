import React, { useState } from 'react'
import './../user.css'

const User = ({ id, usrname, username, countBlogs }) => {
  //console.log('User username:', username)
  //console.log('user name:', usrname)
  return (
    
      
      <div id='wrapper'>
        <div id='first-div'>name:{usrname}</div>
        <div id='second-div'>  {countBlogs}</div>
        
      </div>
  
  )



}

export default User