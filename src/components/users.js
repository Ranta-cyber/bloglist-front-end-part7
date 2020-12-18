import React, { useState, useEffect } from 'react'
import {
  Link
} from "react-router-dom"
import './../user.css'

const Users = ({ users }) => {
  const padding = { padding: 5 }

  return (
    <div>
      <br></br>
      <div id='wrapper'>
        <div id='first-div'>Users</div>
        <div id='second-div'>blogs created</div>
      </div>
      <br></br><br></br>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            <div id='wrapper'>
              <div id='first-div'>
                <Link style={padding} to={`/users/${user.id}`} >{user.name}
                </Link>
              </div>
              <div id='second-div'>  {user.blogs.length}</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
/* const User = ({ id, usrname, username, countBlogs, blogs }) => {
  const padding = { padding: 5 }
  return (
    <div>
      <div id='wrapper'>
        <Link style={padding} to={`/users/${id}`} id='first-div' >{usrname}</Link>
        {/* <div id='first-div'>name:{usrname}</div> }
        <div id='second-div'>  {countBlogs}</div>
      </div>
    </div>
  )
} */

/* const User = ({blogs}) => {
  const id = useParams().id
  const user = user.find(n => n.id === Number(id))
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}  added blogs</h2>
      <div>lista omista blogeista tähän</div>
      <div><strong>{note.important ? 'tärkeä' : ''}</strong></div>
    </div>
  )
} */

export default Users