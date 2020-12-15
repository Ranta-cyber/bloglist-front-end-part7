import React, { useState, useEffect } from 'react'
import {
  Link, Route, Router, Switch
} from "react-router-dom"


const Users = ({ users }) => {

  console.log('User ja:', users)
  return (
    <div>
      <h2>Users</h2>
      <div><h3>blogs created</h3></div>

        <ul>
          {users.map(user =>
            <li key={user.id}>
              <div><Link to={`/users/${user.id}`}>{user.name}  </Link>
                {user.blogs.length}
              </div>
            </li>
          )}
        </ul>

      {/* {users.map(user =>
          <User key={user.id}
            usrname={user.name}
            username={user.username}
            countBlogs={user.blogs.length}
            blogs={user.blogs}
          />
        )
        } */}
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