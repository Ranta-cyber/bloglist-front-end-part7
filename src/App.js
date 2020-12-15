import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/users'
import User from './components/user'
import userService from './services/users'
import loginService from './services/login'
import storage from './utils/storage'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initUser } from './reducers/userReducer'
import Blogs from './components/blogs'
import Blog from './components/Blog'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

var username = null
var passwordHash = null

const App = (props) => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('useEfectissa')
  }, [dispatch])

  const blogs = useSelector(state => state.stateblog)

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
    dispatch(showNotification({ message }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
   /*  props.onLogin('mluukkai')
    history.push('/') */
    try {

      const user = await loginService.login({
        username, passwordHash
      }
      )
      console.log('user:', user)
      dispatch(initUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/passwordHash', 'error')
    }
  }

  const handleLogout = () => {
    //setUser(null)
    dispatch(initUser(null))
    storage.logoutUser()
  }

 /*  const content = () => {
    if (page === 'home') {
      return <Blogs user={user.username} />
    } else if (page === 'blogs') {
      return <Blogs user={user.username} />
    } else if (page === 'users') {
      return <Users users={users} />
    }
  } */

  //console.log('blogs blogs:', blogs)
  const user = useSelector(state => state.stateuser)

  const padding = {
    padding: 5
  }

  const Home = () => (
    <div> <h2>Blogs app</h2> </div>
  )

  const Login = (props) => {
    //const history = useHistory()
    return (
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
    )
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
           {user
            ? <em>{user.name} logged in</em>
            : <Link style={padding} to="/login">login</Link>
          } 
        </div>

        <Switch>
           <Route path="/users/:id">
            <User blogs={blogs} /> 
          </Route>
          <Route path="/blogs">
            <Blogs user={user} />
          </Route>
          <Route path="/users">
            {/* {user ? <Users /> : <Redirect to="/login" />} */}
            <Users users={users}/>
          </Route>
          <Route path="/login">
            {/* <Login onLogin={login} /> */}
            <Login/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <div></div>
    </div>

  )
  {/* return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <a href="" onClick={toPage('blogs')} style={padding}>
          notes
        </a>
        <a href="" onClick={toPage('users')} style={padding}>
          users
        </a>
        {content()}
    </div>
  ) */}
}

export default App