import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/blog_form'
import Users from './components/users'
import userService from './services/users'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import {initializeBlogs, createBlogReducer, voteBlog, removeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initUser} from './reducers/userReducer'

var username = null
var passwordHash = null

const App = (props) => {


  //const [blogs, setBlogs] = useState([])
   //const [user, setUser] = useState(null)
  //const [username, setUsername] = useState('')
  //const [passwordHash, setpasswordHash] = useState('') 
  //const [notification, setNotification] = useState(null)
  const [users, setUsers] = useState([])

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs()) 
    console.log('useEfectissa')
  },[dispatch])

  const blogs = useSelector(state => state.stateblog)

  /* useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []) */

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users))
      console.log('users:', users)
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(initUser(user))
    console.log('user is in effect:', user)
    //setUser(user)
  }, [])

  const notifyWith = (message) => {
    //console.log('notifyWith:', message)
    dispatch(showNotification({message}))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      console.log('user try username:', username)
      console.log('user try password:',passwordHash)

      const user = await loginService.login({
        username, passwordHash}
      )
      console.log('user:', user)
      dispatch(initUser(user))
      /* setUsername('')
      setpasswordHash('')
      setUser(user) */
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/passwordHash', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {

      //console.log('createBlog appj:ssa:', blog)
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      dispatch(createBlogReducer(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
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

  const handleLogout = () => {
    //setUser(null)
    dispatch(initUser(null))
    storage.logoutUser()
  }

  console.log('blogs blogs:', blogs)
  const user = useSelector(state => state.stateuser)
  if ( !user)  {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin} >
          <div>
            username
            <input
              id='username'
              //value={username}
              onChange={({ target }) => username = target.value}
            />
          </div>
          <div>
            passwordHash
            <input
              id='passwordHash'
              //value={passwordHash}
              onChange={({ target }) => passwordHash = target.value}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byvotes = (b1, b2) => b2.votes - b1.votes
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Users users={users}/>

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

export default App