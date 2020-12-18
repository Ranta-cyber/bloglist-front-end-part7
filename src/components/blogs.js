import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './../components/Togglable'
import NewBlog from './../components/blog_form'
import blogService from './../services/blogs'
import { createBlogReducer } from './../reducers/blogReducer'
import {
  Link
} from "react-router-dom"
import { showNotification } from './../reducers/notificationReducer'

const Blogs = ( { user }) => {

  const dispatch = useDispatch()
  
  const blogFormRef = React.createRef()

  var blogs = useSelector(state => state.stateblog)
  const byvotes = (b1, b2) => b2.votes - b1.votes

  const notifyWith = (message) => {
    dispatch(showNotification({ message }))
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      console.log('newblog:', newBlog)
      blogFormRef.current.toggleVisibility()
      dispatch(createBlogReducer(newBlog))
      
      //blogs = blogs.concat(newBlog)
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
      
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      <ul>
        {blogs.sort(byvotes).map(blog =>
          <li key={blog.id}>
            <div><Link to={
              {
                pathname: `/blogs/${blog.id}`
                
              }}> { blog.title } </Link>
            </div>

          </li>
        )}
      </ul>

    </div>
  )
}
export default Blogs