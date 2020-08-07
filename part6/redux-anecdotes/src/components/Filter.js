import React from 'react'
import { connect } from 'react-redux'

import {
  setFilterActionCreator
} from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = ({ target }) => {
    const { value } = target
    props.setFilterActionCreator(value)
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

const mapDispatchToProps = dispatch => ({
  setFilterActionCreator: value => {
    dispatch(setFilterActionCreator(value))
  }
})

export default connect(null, mapDispatchToProps)(Filter)