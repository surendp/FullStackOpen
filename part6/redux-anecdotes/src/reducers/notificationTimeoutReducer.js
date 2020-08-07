// action types
const SET_TIMEOUT_ID = 'SET_TIMEOUT_ID'
const REMOVE_TIMEOUT_ID = 'REMOVE_TIMEOUT_ID'

// action creators
const setTimeoutIdActionCreator = id => ({
  type: SET_TIMEOUT_ID,
  payload: {
    id
  }
})

const removeTimeoutIdActionCreator = () => ({
  type: REMOVE_TIMEOUT_ID,
})

// reducer
const notificationTimeoutReducer = (state = null, action) => {
  let newState = state
  const { type, payload } = action

  switch (type) {
    case SET_TIMEOUT_ID:
      newState = payload.id
      break

    case REMOVE_TIMEOUT_ID:
      newState = null
      break
  
    default:
      break
  }

  return newState
}

export {
  setTimeoutIdActionCreator,
  removeTimeoutIdActionCreator
}

export default notificationTimeoutReducer