import React, { useState } from 'react'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    const theComment = () => createComment(blog.id, comment)
    setComment('')
  }

  return (
    <div>
      <h3>Comments for this blog</h3>

      <form onSubmit={handleComment}>
        <div>

          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />

          <button id="create">add comment</button>
        </div>
      </form>
      <div>
        {blog.comments.map((item, i) => <li key={i}>{item}</li>)}
      </div>
    </div >
  )
}

export default Comments