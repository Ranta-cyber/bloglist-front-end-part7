import React, { useState } from 'react'

const UserForm = (props,ref) => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [passwordHash, setpasswordHash] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, passwordHash
      })

      setUsername('')
      setpasswordHash('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/passwordHash', 'error')
    }
  }

  useImperativeHandle(ref, () => {
    return {
      user
    }
  })

  return (
    <div>
      <h2>login to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          passwordHash
          <input
            id='passwordHash'
            value={passwordHash}
            onChange={({ target }) => setpasswordHash(target.value)}
            
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}


export default UserForm