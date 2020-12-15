import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './../components/Togglable'
import NewBlog from './../components/blog_form'
import Blog from './../components/Blog'
import blogService from './../services/blogs'
import { createBlogReducer, voteBlog, removeBlog } from './../reducers/blogReducer'

const Blogs = ({user}) => {

  const blogFormRef = React.createRef()

  const blogs = useSelector(state => state.stateblog)
  const byvotes = (b1, b2) => b2.votes - b1.votes

  const createBlog = async (blog) => {
    try {
      //console.log('createBlog appj:ssa:', blog)
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      dispatch(createBlogReducer(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
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
      //await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  return(
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byvotes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}
export default Blogs