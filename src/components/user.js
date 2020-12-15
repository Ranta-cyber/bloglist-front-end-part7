import React, { useState } from 'react'
import './../user.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Blog from './Blog'



const User = ({ blogs }) => {
  /* const id = useParams().id
  const user = user.find(n => n.id === Number(id)) */
  return (
    <div>
      <h2>  added blogs</h2>
      <ul>
        {blogs.map(blog =>
          <li key={Blog.id}>
            <div>
              {blog.title}
            </div>
          </li>
        )}
      </ul>

      {/* <div>{note.user}</div> */}
      {/* <div><strong>{note.important ? 'tärkeä' : ''}</strong></div> */}
    </div>
  )
}
export default User