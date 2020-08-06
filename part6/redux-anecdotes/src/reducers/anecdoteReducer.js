import anecdoteService from '../services/anecdotes'

// action types
const FETCH_ALL_ANECDOTES = 'FETCH_ALL_ANECDOTES'
const VOTE = 'VOTE'
const CREATE_NEW_ANECDOTE = 'CREATE_NEW_ANECDOTE'

// action creators
const voteActionCreator = id => {
  return async (dispatch, getState) => {
    // extract the anecdote to be updated
    const updateAnecdote = getState()
      .anecdotes
      .find(anecdote => anecdote.id === id)
    
    // update the anecdote and call to update
    const anecdote = await anecdoteService
      .update({
        ...updateAnecdote,
        votes: updateAnecdote.votes + 1
      })
  
    // dispatch the updated anecdote to redux store
    dispatch({
      type: VOTE,
      payload: {
        anecdote
      }
    })
  }
}

const createNewAnecdoteActionCreator = content => {
  return async dispatch => {
    const anecdote = await anecdoteService
      .createAnecdote({
        content,
        votes: 0
      })

    dispatch({
      type: CREATE_NEW_ANECDOTE,
      payload: {
        anecdote
      }
    })
  }
}

const fetchAllAnecdotesActionCreator = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService
      .getAll()

    dispatch({
      type: FETCH_ALL_ANECDOTES,
      payload: {
        anecdotes
      }
    })
  }
}

//case-handlers
const voteAnecdote = (state, payload) => {
  const { anecdote } = payload
  return state.map(anec => {
    if (anec.id === anecdote.id) {
      return {
        ...anecdote,
      }
    }

    return anec
  })
}

const createNewAnecdote = (state, payload) => {
  const { anecdote } = payload
  return [
    ...state,
    anecdote
  ]
}

const fetchAllAnecdotes = (state, payload) => ([
  ...payload.anecdotes
])

// reducer
const reducer = (state = [], action) => {
  let newState = [
    ...state
  ]

  switch(action.type) {
    case VOTE:
      newState = voteAnecdote(state, action.payload)
      break

    case CREATE_NEW_ANECDOTE:
      newState = createNewAnecdote(state, action.payload)
      break

    case FETCH_ALL_ANECDOTES:
      newState = fetchAllAnecdotes(state, action.payload)
      break

    default:
      break
  }

  return newState
}

export {
  voteActionCreator,
  createNewAnecdoteActionCreator,
  fetchAllAnecdotesActionCreator
}

export default reducer