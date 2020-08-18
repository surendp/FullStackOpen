import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUsersActionCreator } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Container, Typography, Table, Paper, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  usersHeading: {
    marginBottom: '24px'
  }
})

const Users = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsersActionCreator())
  }, [])

  return (
    <Container>
      <Typography
        variant="h4"
        className={classes.usersHeading}
      >
        {'Users'}
      </Typography>
      <Paper component={Table}>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Paper>
    </Container>
  )
}

export default Users
