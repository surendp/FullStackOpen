import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from '@material-ui/core/'
import {
  makeStyles
} from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  logoutActionCreator
} from '../reducers/authenticationReducer'

const useStyles = makeStyles({
  typography: {
    color: 'white',
    flexGrow: 1,
    textAlign: 'center'
  },
})

const CustomNavBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.authentication.user)

  const handleLogout = () => {
    dispatch(logoutActionCreator())
    history.push('/')
  }

  const loggedInContent = () => (
    <>
      <Button color="inherit" to="/" component={Link}>Blogs</Button>
      <Button color="inherit" to="/users" component={Link}>Users</Button>
      <Typography className={classes.typography}>
        {`${user.name} logged in`}
      </Typography>
      <Button
        onClick={handleLogout}
        variant='contained'
      >
        {'Logout'}
      </Button>
    </>
  )

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {
            user ? loggedInContent() : (
              <Typography className={classes.typography}>
                {'Log in to Blog App'}
              </Typography>
            )
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default CustomNavBar