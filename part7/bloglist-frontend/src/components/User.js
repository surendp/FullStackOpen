import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchSelectedUserActionCreator
} from '../reducers/selectedUserReducer'
import { Container, Table, Paper, Typography, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  username: {
    marginBottom: '24px',
    padding: '16px'
  }
})

const User = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.selectedUser)
  const userId = useParams().id

  useEffect(() => {
    dispatch(fetchSelectedUserActionCreator(userId))
  }, [])

  if (!user) {
    return null
  }

  const renderBlogs = () => user.blogs.map(blog => (
    <TableRow key={blog.id}>
      <TableCell>
        {blog.title}
      </TableCell>
    </TableRow>
  ))

  return (
    <Container>
      <Paper>
        <Typography
          variant="h5"
          className={classes.username}
        >
          {`Profile of ${user.name}`}
        </Typography>
      </Paper>
      <Paper component={Table}>
        <TableHead>
          <TableRow>
            <TableCell>
              {'Added Blogs'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderBlogs()}
        </TableBody>
      </Paper>
    </Container>
  )
}

export default User