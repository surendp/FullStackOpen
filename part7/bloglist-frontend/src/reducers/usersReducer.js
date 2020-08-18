import userService from '../services/users'

// action types
const FETCH_USERS = 'FETCH_USERS'

// action creators
const fetchUsersActionCreator = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: FETCH_USERS,
        payload: users
      })
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
const usersReducer = (state = [], action) => {
  let newState = [ ...state ]
  const { type, payload } = action

  switch (type) {
    case FETCH_USERS:
      newState = [
        ...payload
      ]
      break

    default:
      break
  }

  return newState
}

export {
  fetchUsersActionCreator
}

export default usersReducer