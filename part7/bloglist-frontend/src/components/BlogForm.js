import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TableBody, Table, Typography, Paper, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CustomFormField from './CustomFormField'

const useStyles = makeStyles({
  root: {
    marginBottom: '24px',
  },
  formHeading: {
    padding: '24px 0px',
    textAlign: 'center'
  },
  createButton: {
    alignSelf: 'center',
    margin: '24px 0px 24px 48px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 32px 0px 16px'
  },
  formField: {
    width: '100%',
  },
  table: {
    maxWidth: '800px',
    alignSelf: 'center'
  }
})

const BlogForm = ({
  handleClickCreate,
}) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    handleClickCreate(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleChangeFormData = fieldName => {
    if (fieldName === 'title') {
      return event => setTitle(event.target.value)
    }

    if (fieldName === 'author') {
      return event => setAuthor(event.target.value)
    }

    if (fieldName === 'url') {
      return event => setUrl(event.target.value)
    }
  }

  return (
    <Paper className={classes.root}>
      <Typography
        variant="h4"
        className={classes.formHeading}
      >
        {'Create New'}
      </Typography>
      <Divider />
      <form
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Table className={classes.table}>
          <TableBody>
            <CustomFormField
              id="title"
              label="title"
              variant="outlined"
              value={title}
              size="small"
              onChange={handleChangeFormData('title')}
              className={classes.formField}
            />
            <CustomFormField
              id="author"
              label="author"
              variant="outlined"
              size="small"
              value={author}
              className={classes.formField}
              onChange={handleChangeFormData('author')}
            />
            <CustomFormField
              variant="outlined"
              label="url"
              id="url"
              size="small"
              value={url}
              className={classes.formField}
              onChange={handleChangeFormData('url')}
            />
          </TableBody>
        </Table>
        <Button
          id="create"
          type="submit"
          variant="outlined"
          color='inherit'
          className={classes.createButton}
        >
          {'create'}
        </Button>
      </form>
    </Paper>
  )
}

BlogForm.propTypes = {
  handleClickCreate: PropTypes.func.isRequired,
}

export default BlogForm