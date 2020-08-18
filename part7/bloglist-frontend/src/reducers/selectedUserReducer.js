import userService from '../services/users'

// action types
const FETCH_SELECTED_USER = 'FETCH_SELECTED_USER'

// action creators
const fetchSelectedUserActionCreator = (userId) => {
  return async dispatch => {
    try {
      const user = await userService.getOne(userId)
      dispatch({
        type: FETCH_SELECTED_USER,
        payload: user
      })
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
const selectedUserReducer = (state = null, action) => {
  let newState = state
  const { type, payload } = action

  switch (type) {
    case FETCH_SELECTED_USER:
      newState = payload
      break

    default:
      break
  }

  return newState
}

export {
  fetchSelectedUserActionCreator
}

export default selectedUserReducer