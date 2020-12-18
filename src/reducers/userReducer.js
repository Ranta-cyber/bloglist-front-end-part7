const reducerUser = (state = null, action) => {

  switch (action.type) {
    case 'INIT':
      return action.data.user
  }
  return state
}

export const initUser = (user) => {
  return {
    type: 'INIT',
    data: { user }
  }
}


export default reducerUser