import React from 'react'
import { connect } from 'react-redux'

import {
  createNewAnecdoteActionCreator
} from '../reducers/anecdoteReducer'

import {
  setNotificationActionCreator
} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const createNewAnecdote = event => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createNewAnecdoteActionCreator(value)
    props.setNotificationActionCreator(`you created '${value}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button
          type='submit'
        >
          {'create'}
        </button>
      </form>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  createNewAnecdoteActionCreator: value => {
    dispatch(createNewAnecdoteActionCreator(value))
  },
  setNotificationActionCreator: (...value) => {
    dispatch(setNotificationActionCreator(...value))
  }
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)