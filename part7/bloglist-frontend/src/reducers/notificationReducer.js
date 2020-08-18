// action types
const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

// action creators
const notificationActionCreator = (message, isError, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotificationActionCreator(message, isError))
    setTimeout(() => {
      dispatch(clearNotificationActionCreator())
    }, timeInSeconds * 1000)
  }
}

const setNotificationActionCreator = (message, isError) => ({
  type: SET_NOTIFICATION,
  payload: {
    message,
    isError
  }
})

const clearNotificationActionCreator = () => ({
  type: CLEAR_NOTIFICATION
})

// default state
const defaultState = {
  message: null,
  isError: false,
}

// reducer
const notificationReducer = (state = defaultState, action) => {
  let newState = { ...state }
  const { type, payload } = action

  switch (type) {
    case SET_NOTIFICATION:
      newState = {
        ...state,
        message: payload.message,
        isError: payload.isError
      }
      break

    case CLEAR_NOTIFICATION:
      newState = {
        ...state,
        message: null,
        isError: false,
      }
      break

    default:
      break
  }

  return newState
}

export {
  setNotificationActionCreator,
  clearNotificationActionCreator,
  notificationActionCreator,
}

export default notificationReducer