import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification'
import Filter from './Filter'

import {
  voteActionCreator,
} from '../reducers/anecdoteReducer'

import {
  createNotificationActionCreator,
  removeNotificationActionCreator
} from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => {
    if (!state.filter) {
      return state.anecdotes
    }

    return state.anecdotes.filter(
      anecdote => anecdote.content.includes(state.filter)
    )
  })

  const vote = id => {
    const anecdote = anecdotes
      .find(anecdote => anecdote.id === id)
  
    dispatch(voteActionCreator(id))
    dispatch(createNotificationActionCreator(`you voted '${anecdote.content}'`))

    setTimeout(() => {
      dispatch(removeNotificationActionCreator())
    }, 5000)
  }

  const orderedAnecdotes = anecdotes => anecdotes.sort(
    (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
  )

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
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