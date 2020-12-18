import React, { useState } from 'react'
import './../user.css'
import {
  useParams
} from "react-router-dom"
import Blog from './blog'

const User = ({ blogs }) => {
  const id = useParams().id

  const userblogs = blogs.filter(el => el.user.id === id)

  return (
    <div>
      <h2>  added blogs</h2>
      <ul>
        {userblogs.map(blog =>
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