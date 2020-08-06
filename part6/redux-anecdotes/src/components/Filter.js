import React from 'react'
import { useDispatch } from 'react-redux'

import {
  setFilterActionCreator
} from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    const { value } = target
    dispatch(setFilterActionCreator(value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter