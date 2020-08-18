import React, { useState } from 'react'
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
  loginActionCreator
} from '../reducers/authenticationReducer'
import CustomFormField from './CustomFormField'
import { makeStyles } from '@material-ui/styles'

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
    flexDirection: 'column'
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

  loginButton: {
    alignSelf: 'center',
    flexGrow: 1,
    marginBottom: '32px'
  }
})

const LoginForm = () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(loginActionCreator(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <Container className={classes.root}>
      <Paper
        component="form"
        className={classes.form}
        onSubmit={handleLogin}
      >
        <Typography
          variant="h4"
          className={classes.formHeading}
        >
          {'Log in to application'}
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
          id="login-button"
          type="submit"
          variant="outlined"
          color='inherit'
          className={classes.loginButton}
        >
          {'login'}
        </Button>
      </Paper>
    </Container>
  )
}

export default LoginForm