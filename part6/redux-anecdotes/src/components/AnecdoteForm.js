import React from 'react'
import { useDispatch } from 'react-redux'

import {
  createNewAnecdoteActionCreator
} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = event => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNewAnecdoteActionCreator(value))
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