import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { addCommentActionCreator } from '../reducers/selectedBlogReducer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center'
  },

  button: {
    marginLeft: '4px'
  }
})

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const userId = useParams().id
  const classes = useStyles()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addCommentActionCreator(comment, userId))
    setComment('')
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        value={comment}
        onChange={event => setComment(event.target.value)}
        id="outlined-basic"
        label="Add comment"
        variant="outlined"
        size="small"
      />
      <Button
        className={classes.button}
        type="submit"
        variant="outlined"
      >
        {'Add Comment'}
      </Button>
    </form>
  )
}

export default CommentForm