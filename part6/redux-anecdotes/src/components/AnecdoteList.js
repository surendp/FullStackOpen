import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'

import Notification from './Notification'
import Filter from './Filter'

import {
  voteActionCreator,
} from '../reducers/anecdoteReducer'

import {
  setNotificationActionCreator
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

const AnecdoteList = props => {
  const { anecdotes, ...more } = props

  const vote = id => {
    const anecdote = anecdotes
      .find(anecdote => anecdote.id === id)
  
    more.voteActionCreator(id)
    more.setNotificationActionCreator(`you voted '${anecdote.content}'`, 5)
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
            key={anecdote.id}
            anecdote={anecdote}
            vote={vote}
          />
        )
      )}
    </>
  )
}

const mapStateToProps = ({
  filter,
  anecdotes
}) => {
  if (!filter) {
    return {
      anecdotes
    }
  }

  return {
    anecdotes: anecdotes.filter(
      anecdote => anecdote.content.includes(filter)
    )
  }
}

const mapDispatchToProps = dispatch => ({
  voteActionCreator: value => {
    dispatch(voteActionCreator(value))
  },
  setNotificationActionCreator: value => {
    dispatch(setNotificationActionCreator(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)