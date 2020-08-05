import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleClickCreate,
}) => {
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
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleChangeFormData('title')} />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={handleChangeFormData('author')} />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={handleChangeFormData('url')} />
        </div>
        <button
          id="create"
          type="submit"
        >
          {'create'}
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleClickCreate: PropTypes.func.isRequired,
}

export default BlogForm