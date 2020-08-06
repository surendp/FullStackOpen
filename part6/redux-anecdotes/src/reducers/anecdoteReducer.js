const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// action types
const VOTE = 'VOTE'
const CREATE_NEW_ANECDOTE = 'CREATE_NEW_ANECDOTE'

// action creators
const voteActionCreator = id => ({
  type: VOTE,
  payload: {
    id
  }
})

const createNewAnecdoteActionCreator = anecdote => ({
  type: CREATE_NEW_ANECDOTE,
  payload: {
    content: anecdote
  }
})

//case-handlers
const voteAnecdote = (state, payload) => {
  const { id } = payload
  return state.map(anecdote => {
    if (anecdote.id === id) {
      return {
        ...anecdote,
        votes: anecdote.votes + 1
      }
    }

    return anecdote
  })
}

const createNewAnecdote = (state, payload) => {
  const { content } = payload
  return [
    ...state,
    asObject(content)
  ]
}

// reducer
const reducer = (state = initialState, action) => {
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

    default:
      break
  }

  return newState
}

export {
  voteActionCreator,
  createNewAnecdoteActionCreator
}

export default reducer