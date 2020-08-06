import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import {
  voteActionCreator
} from '../reducers/anecdoteReducer'

const Anecdote = ({
  anecdote,
  vote
}) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button
        onClick={() => vote(anecdote.id)}
      >
        {'vote'}
      </button>
    </div>
  </div>
)

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    votes: PropTypes.number
  }).isRequired,
  vote: PropTypes.func.isRequired
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(voteActionCreator(id))
  }

  const orderedAnecdotes = anecdotes => anecdotes.sort(
    (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
  )

  return (
    <>
      <h2>Anecdotes</h2>
      {orderedAnecdotes(anecdotes)
        .map(anecdote => (
          <Anecdote
            anecdote={anecdote}
            vote={vote}
          />
        )
      )}
    </>
  )
}

export default AnecdoteList