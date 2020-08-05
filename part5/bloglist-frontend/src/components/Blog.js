import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  loggedUser,
  blog,
  handleClickLike,
  handleClickDelete,
}) => {
  const [detailView, setDetailView] = useState(false)
  const {
    title,
    author,
    url,
    likes,
    user,
  } = blog

  const style = {
    border: '2px solid black',
    padding: '8px 4px',
    marginBottom: '4px',
  }

  const hiddenContent = () => {
    return (
      <>
        <div>{url}</div>
        <div>
          {`likes ${likes}`}
          <button
            className='blog-like-button'
            onClick={handleClickLike}
          >
            {'like'}
          </button>
        </div>
        <div>{user.name}</div>
        {
          user.id === loggedUser.id ? (
            <button
              onClick={handleClickDelete}
            >
              {'remove'}
            </button>
          ) : ''
        }
      </>
    )
  }

  return (
    <div  style={style} className="blog">
      {title} {author}
      <button
        className='blog-toggle-button'
        onClick={() => setDetailView(!detailView)}
      >
        {`${detailView ? 'hide' : 'view'}`}
      </button>
      {
        detailView
          ? hiddenContent()
          : null
      }
    </div>
  )
}

Blog.propTypes = {
  loggedUser: PropTypes.shape({
    token: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    id: PropTypes.string,
    user: PropTypes.shape({
      userName: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  handleClickLike: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
}

export default Blog
