import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import Comments from './../components/comments'

const Blog = ({ blogs, user }) => {
  const [visible, setVisible] = useState(false)

  //console.log('blogissa:', blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  /* console.log('blogs:', blogs)
  console.log('blog:', blog)
  console.log('id:', id) */

  //const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author}
      </div>

      <div>
        <div>{blog.url}</div>
        <div>votes {blog.votes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.username}</div>
        {/* <div>{blog.user.name}</div> */}
        {(blog.user.id===user.id) && <button onClick={() => handleRemove(blog.id)}>remove</button>}

        <div><Comments comments = {blog.comments} /></div>
      </div>
      </div>)
}

/* Blog.propTypes = {
        blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
} */

export default Blog