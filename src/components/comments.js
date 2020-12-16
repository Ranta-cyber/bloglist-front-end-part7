import React, { useState } from 'react'



const Comments = ({ comments }) => {

  return (
    <div>
      <h3>Comments for this blog</h3>
      <div>
      {comments.map((item,i) => <li key={i}>{item}</li>)}
      </div>
    </div>

  )

}

export default Comments