import {
  setTimeoutIdActionCreator,
  removeTimeoutIdActionCreator
} from "./notificationTimeoutReducer"

// action types
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

// action creators
const setNotificationActionCreator = (notification, timeInSeconds) => {
  return (dispatch, getState) => {
    dispatch(createNotificationActionCreator(notification))

    // if a timeout is already set, clear the timeout
    if (getState().notificationTimeoutId) {
      clearTimeout(getState().notificationTimeoutId)
    }

    // set new time out to remove new notification
    const notificationTimeoutId = setTimeout(() => {
      dispatch(removeNotificationActionCreator())
      dispatch(removeTimeoutIdActionCreator())
    }, timeInSeconds * 1000)

    // save the notificationTimeoutId
    dispatch(setTimeoutIdActionCreator(notificationTimeoutId))
  }
}

const createNotificationActionCreator = notification => ({
  type: CREATE_NOTIFICATION,
  payload: {
    notification
  }
})

const removeNotificationActionCreator = () => ({
  type: REMOVE_NOTIFICATION,
})

// reducer
const notificationReducer = (state = null, action) => {
  let newState = state
  const { type, payload } = action

  switch (type) {
    case CREATE_NOTIFICATION:
      newState = payload.notification
      break

    case REMOVE_NOTIFICATION:
      newState = null
      break

    default:
      break
  }

  return newState
}

export {
  setNotificationActionCreator
}

export default notificationReducer