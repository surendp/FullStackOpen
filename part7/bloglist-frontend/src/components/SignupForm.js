import React, { useState, useEffect } from 'react'
import {
  Container,
  Table,
  TableBody,
  Button,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'

import {
  signupActionCreator
} from '../reducers/authenticationReducer'

import CustomFormField from './CustomFormField'
import { makeStyles } from '@material-ui/styles'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },

  form: {
    marginBottom: '8px',
    maxWidth: '400px',
    flexGrow: 1,
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px'
  },

  formHeading: {
    textAlign: 'center',
    padding: '24px 0px'
  },

  table: {
    margin: '24px 0px'
  },

  notification: {
    marginTop: '8px'
  },

  signupButton: {
    alignSelf: 'center',
    flexGrow: 1,
    marginBottom: '8px'
  },

  loginButton: {
    marginBottom: '32px',
    textAlign: 'center'
  }
})

const SignupForm = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const authentication = useSelector(state => state.authentication)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (authentication.user) {
      history.push('/')
    }
  }, [authentication.user])
  const handleSignup = async event => {
    event.preventDefault()
    dispatch(signupActionCreator(name, username, password))
    setUsername('')
    setPassword('')
    setName('')
  }

  return (
    <Container className={classes.root}>
      <Paper
        component="form"
        className={classes.form}
        onSubmit={handleSignup}
      >
        <Typography
          variant="h4"
          className={classes.formHeading}
        >
          {'Register to application'}
        </Typography>
        <Divider />
        {
          notification.message ? (
            <div className={classes.notification}>
              <Notification
                message={notification.message}
                isError={notification.isError}
              />
            </div>
          ) : null
        }
        <Table className={classes.table}>
          <TableBody>
            <CustomFormField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <CustomFormField
              id="username"
              label="username"
              variant="outlined"
              value={username}
              size="small"
              onChange={({ target }) => setUsername(target.value)}
            />
            <CustomFormField
              id="password"
              type="password"
              label="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </TableBody>
        </Table>
        <Button
          id="signup-button"
          type="submit"
          variant="outlined"
          color='inherit'
          className={classes.signupButton}
          fullWidth
        >
          {'Signup'}
        </Button>
        <Button
          component={Link}
          to='/'
          variant="outlined"
          color='inherit'
          className={classes.loginButton}
          fullWidth
        >
          {'Login'}
        </Button>
      </Paper>
    </Container>
  )
}

export default SignupForm