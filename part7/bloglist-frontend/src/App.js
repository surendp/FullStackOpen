import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import CustomNavBar from './components/CustomNavBar'

import blogService from './services/blogs'

import {
  setUserActionCreator,
} from './reducers/authenticationReducer'
import SignupForm from './components/SignupForm'

const useStyles = makeStyles({
  heading: {
    margin: '32px 0px'
  }
})

const App = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.authentication.user)

  useEffect(() => {
    const user = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )

    if (user) {
      blogService.setToken(user.token)
      dispatch(setUserActionCreator(user))
    }
  }, [])

  const heading = () => (
    <div>
      <Typography
        variant='h2'
        className={classes.heading}
      >
        {'Blog App'}
      </Typography>
      {
        notification.message ? (
          <Notification
            message={notification.message}
            isError={notification.isError}
          />
        ) : null
      }
    </div>
  )

  return (
    <div>
      <CustomNavBar />
      <Container>
        {user ? heading() : ''}
      </Container>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/">
          {user ? null : <LoginForm />}
          {user ? <Blogs /> : null}
        </Route>
      </Switch>
    </div>
  )
}

export default App