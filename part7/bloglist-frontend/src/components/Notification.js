import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => (
  <div
    id="notification"
    className={`notification ${isError ? 'error' : 'success'}`}
  >
    { message }
  </div>
)

Notification.propType = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
}

export default Notification