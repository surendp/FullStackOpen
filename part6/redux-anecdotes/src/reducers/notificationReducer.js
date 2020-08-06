// action types
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

// action creators
const setNotificationActionCreator = (notification, timeInSeconds) => {
  return dispatch => {
    dispatch(createNotificationActionCreator(notification))
    setTimeout(() => {
      dispatch(removeNotificationActionCreator())
    }, timeInSeconds * 1000)
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