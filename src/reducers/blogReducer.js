import blogService from './../services/blogs'

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

const getId = () => (100000 * Math.random()).toFixed(0)


const reducerBlog = (state = [], action) => {

  switch (action.type) {
    case 'NEW_BLOG':

      const blogi = {
        author: action.data.author,
        title: action.data.title,
        url: action.data.url,
        votes: 0,
        user: action.data.user,
        id: action.data.id
      }

      return state.concat(blogi) 

    case 'ADD_COMMENT': {

      const blogToChange = state.find(n => n.id === action.data.id)
      const newComment = action.data.comment

      const newBlog = { ...blogToChange, comments: [...blogToChange.comments, newComment] }

      //console.log('newBlog:', newBlog)

      return state.map(blog =>
        blog.id !== action.data.id ? blog : newBlog)

    }

    case 'REMOVE': {

      const id = action.data.id
      return state.filter(b => b.id !== id)

    }

    case 'INCREMENT': {

      const id = action.data.content.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        votes: action.data.content.votes
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    }

    case 'FILTERING': {
      const filterText = action.data.toFilter
      return action.data
      /*   if (filterText === '') {
          return initialState
        } else {
          return state.filter(el =>
            el.content.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        } */
    }
    case 'INIT_BLOGS':
      return action.data

    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {

    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {

  return async dispatch => {

    const removeBlog = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: { id }
    })
  }
}

export const voteBlog = (content) => {

  return async dispatch => {

    const updBlog = await blogService.update(content)
    dispatch({
      type: 'INCREMENT',
      data: { content }
    })
  }
}

export const filterBlogs = (toFilter) => {
  return {
    type: 'FILTERING',
    data: { toFilter }
  }

}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createBlogReducer = (content) => {

  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(
      {
        type: 'NEW_BLOG',
        data: {
          author: content.author,
          title: content.title,
          url: content.url,
          user: content.user,
          id: generateId()
        }
      })
  }
}

export const createCommentReducer = (id, comment) => {

  return {
    type: 'ADD_COMMENT',
    data: {
      comment: comment,
      id: id
    }

  }
}

export default reducerBlog