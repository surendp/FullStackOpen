import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import CommentForm from './CommentForm'

import {
  fetchSelectedBlogActionCreator,
  likeBlogActionCreator
} from '../reducers/selectedBlogReducer'

import {
  deleteBlogActionCreator
} from '../reducers/blogsReducer'
import { Container, Typography, Paper, Button, Divider, Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: '32px',
  },

  commentsHeading: {
    margin: '24px 0px',
  },

  blogTitle: {
    marginBottom: '24px'
  },

  likeButton: {
    marginRight: '24px'
  },

  blogDetails: {
    padding: '24px'
  },

  commentsTable: {
    marginTop: '24px',
    backgroundColor: '#fafafa'
  }
})

const Blog = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const blogId = useParams().id
  const {
    selectedBlog,
    authentication,
  } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchSelectedBlogActionCreator(blogId))
  }, [])

  if (!selectedBlog) {
    return null
  }

  const {
    title,
    author,
    url,
    likes,
    user,
    comments,
  } = selectedBlog

  const handleClickLike = () => {
    dispatch(likeBlogActionCreator(selectedBlog))
  }

  const handleClickDelete = () => {
    const confirm = window.confirm(`Remove blog ${selectedBlog.title}`)
    if (!confirm) {
      return
    }

    dispatch(deleteBlogActionCreator(selectedBlog))
    history.push('/')
  }

  const renderComments = () => comments.map(comment =>
    <TableRow key={comment.id}>
      <TableCell>
        {comment.comment}
      </TableCell>
    </TableRow>
  )

  return (
    <Container component={Paper} className={classes.root}>
      <Typography
        variant="h4"
        className={classes.blogTitle}
      >
        {`${title} (By ${author})`}
      </Typography>
      <Divider />
      <div className={classes.blogDetails}>
        <Typography
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </Typography>
        <Typography>
          {`Likes ${likes}`}
        </Typography>
        <Typography>
          {user.name}
        </Typography>
        <Button
          className={classes.likeButton}
          onClick={handleClickLike}
          variant="outlined"
          size="small"
        >
          {'like'}
        </Button>
        {
          user.id === authentication.user.id ? (
            <Button
              onClick={handleClickDelete}
              variant="outlined"
              size="small"
            >
              {'remove'}
            </Button>
          ) : ''
        }
      </div>
      <Typography
        variant="h5"
        className={classes.commentsHeading}
      >
        {'Comments'}
      </Typography>
      <CommentForm />
      <Table className={classes.commentsTable}>
        <TableBody>
          {renderComments()}
        </TableBody>
      </Table>
    </Container>
  )
}

export default Blog
