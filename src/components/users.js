import React, { useState, useEffect } from 'react'
import userService from './../services/users'
import User from './../components/user'



const Users = ({users}) => {

  console.log('User ja:', users)
return(
 <div>
    <h2>Users</h2>
    <div><h3>blogs created</h3></div>
  

  {users.map(user =>
    <User
      key={user.id}
      usrname={user.name}
      username = {user.username}
      countBlogs = {user.blogs.length}
      //blogs = {user.blogs}
    /* handleLike={handleLike}
    handleRemove={handleRemove}
    own={user.username===blog.user.username} */
    />
  )
}
</div>)
}

export default Users