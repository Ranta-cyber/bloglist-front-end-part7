import React, { useState, useEffect } from 'react'
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
import Blog from './components/blog'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

var username = null
var passwordHash = null


const App = (props) => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState('home')
  const dispatch = useDispatch()

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('useEfectissa')
  }, [dispatch])

  const blogs = useSelector(state => state.stateblog)

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users))
    //console.log('users:', users)
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(initUser(user))
    console.log('user is in effect:', user)

  }, [])

  const notifyWith = (message) => {
    dispatch(showNotification({ message }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    /*  props.onLogin('user')
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

    dispatch(initUser(null))
    storage.logoutUser()
  }

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
            ? <em>{user.name} logged in </em>
            : <Link style={padding} to="/login">login</Link>
          }
          <button onClick={handleLogout}>logout</button>
        </div>

        <Switch>
          <Route path="/users/:id">
            <User blogs={blogs} />
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} user={user} />
          </Route>
          <Route path="/blogs">
            <Blogs user={user} />
          </Route>
          <Route path="/users">
            {/* {user ? <Users /> : <Redirect to="/login" />} */}
            <Users users={users} />
          </Route>
          <Route path="/login">
            {/* <Login onLogin={login} /> */}
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <div></div>
    </div>

  )
}
export default App