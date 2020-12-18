import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import { createCommentReducer } from './../reducers/blogReducer'
import blogService from './../services/blogs'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blogs, user }) => {

  console.log('state after dispatch is:, ', useSelector(state => state.stateblog))

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const createComment = async (id, comment) => {
    console.log('createcomment:', comment)
    try {
      const newComment = await blogService.postComment(id, comment)
      dispatch(createCommentReducer(id, comment))
      
      //notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const id = useParams().id

console.log('params id:', id)

  const blog = blogs.find(n => n.id === id)
  var comment = ''

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

        {(blog.user.id === user.id) && <button onClick={() => handleRemove(blog.id)}>remove</button>}

        {blog.comments.map((item, i) => <li key={i}>{item}</li>)}
        <div>
          <input
            id='comment'
            onChange={({ target }) => comment = target.value}
          />

          <button onClick={() => createComment(blog.id, comment)}>add comment</button>
        </div>
      </div>
    </div>
  )
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