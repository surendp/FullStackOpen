import loginService from '../services/login'
import blogService from '../services/blogs'
import {
  notificationActionCreator
} from './notificationReducer'

// action types
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

// action creators
const setUserActionCreator = user => ({
  type: SET_USER,
  payload: user
})

const removeUserActionCreator = () => ({
  type: REMOVE_USER
})

const loginActionCreator = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUserActionCreator(user))
    } catch (error) {
      dispatch(notificationActionCreator(
        'Wrong credentials',
        true,
        5
      ))
    }
  }
}

const logoutActionCreator = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUserActionCreator())
  }
}

//default state
const defaultState = {
  user: null
}

// reducer
const authenticationReducer = (state = defaultState, action) => {
  let newState = { ...state }
  const { type, payload } = action

  switch (type) {
    case SET_USER:
      newState = {
        ...state,
        user: payload
      }
      break

    case REMOVE_USER:
      newState = {
        ...state,
        user: null,
      }
      break

    default:
      break
  }

  return newState
}

export {
  setUserActionCreator,
  removeUserActionCreator,
  loginActionCreator,
  logoutActionCreator
}

export default authenticationReducer