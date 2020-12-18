import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import { createCommentReducer, voteBlog, removeBlog } from './../reducers/blogReducer'
import { showNotification } from './../reducers/notificationReducer'
import blogService from './../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

const Blog = ( { blogs }) => {
  
  const history = useHistory()

  console.log('state after dispatch is:, ', useSelector(state => state.stateblog))

  const user = useSelector(state => state.stateuser)

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const notifyWith = (message) => {
    dispatch(showNotification({ message }))
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, votes: blogToLike.votes + 1, user: blogToLike.user.id }
    dispatch(voteBlog(likedBlog))
    //await blogService.update(likedBlog)
    //setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, votes: blogToLike.votes + 1 } : b))
    notifyWith(`a new like '${likedBlog.title}' by ${likedBlog.author} added!`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      history.push('/blogs')
      //await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const createComment = async (id, comment) => {
    console.log('createcomment:', comment)
    try {
      const newComment = await blogService.postComment(id, comment)
      dispatch(createCommentReducer(id, comment))
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

        {(blog.user.name === user.name) && <button onClick={() => handleRemove(blog.id)}>remove</button>}

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