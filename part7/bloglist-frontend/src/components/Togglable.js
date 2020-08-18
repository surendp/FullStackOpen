import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = ({
  buttonLabel,
  children,
}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          variant="outlined"
          color="inherit"
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          onClick={toggleVisibility}
          variant="outlined"
          color="inherit"
        >
          {'Cancel'}
        </Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable