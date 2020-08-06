// action types
const SET_FILTER = 'SET_FILTER'

// action creators
const setFilterActionCreator = filter => ({
  type: SET_FILTER,
  payload: {
    filter
  }
})

// reducer
const filterReducer = (state = null, action) => {
  let newState = state
  const { type, payload } = action

  switch (type) {
    case SET_FILTER:
      newState = payload.filter
      break

    default:
      break
  }

  return newState
}

export {
  setFilterActionCreator
}

export default filterReducer