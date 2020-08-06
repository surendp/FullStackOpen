import React from 'react'
import { useDispatch } from 'react-redux'

import {
  createNewAnecdoteActionCreator
} from '../reducers/anecdoteReducer'

import {
  setNotificationActionCreator
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = event => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createNewAnecdoteActionCreator(value))
    dispatch(setNotificationActionCreator(`you created '${value}'`, 5))
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

export default AnecdoteForm