import blogService from '../services/blogs'
import { notificationActionCreator } from './notificationReducer'

// action types
const FETCH_SELECTED_BLOG = 'FETCH_SELECTED_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const ADD_COMMENT = 'ADD_COMMENT'

// action creators
const fetchSelectedBlogActionCreator = blogId => {
  return async dispatch => {
    try {
      const selectedBlog = await blogService
        .getOne(blogId)
      dispatch({
        type: FETCH_SELECTED_BLOG,
        payload: selectedBlog
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const likeBlogActionCreator = blogToBeLiked => {
  const likedBlog = {
    ...blogToBeLiked,
    likes: blogToBeLiked.likes + 1,
    user: blogToBeLiked.user.id,
  }

  return async dispatch => {
    try {
      const blog = await blogService
        .update(likedBlog)

      dispatch({
        type: LIKE_BLOG,
        payload: blog
      })
    } catch (error) {
      console.error(error)
    }
  }
}

const addCommentActionCreator = (content, userId) => {
  return async dispatch => {
    try {
      const comment = await blogService
        .createComment(content, userId)

      dispatch({
        type: ADD_COMMENT,
        payload: comment
      })
    } catch (error) {
      console.log(error)
      dispatch(notificationActionCreator(error.response.data.error, true, 5))
    }
  }
}

// helper functions
const addCommentHelper = (state, payload) => ({
  ...state,
  comments: [
    ...state.comments,
    payload
  ]
})

// reducer
const selectedBlogReducer = (state = null, action) => {
  let newState = state
  const { type, payload } = action

  switch (type) {
    case FETCH_SELECTED_BLOG:
      newState = payload
      break

    case LIKE_BLOG:
      newState = payload
      break

    case ADD_COMMENT:
      newState = addCommentHelper(state, payload)
      break

    default:
      break
  }

  return newState
}

export {
  fetchSelectedBlogActionCreator,
  likeBlogActionCreator,
  addCommentActionCreator
}

export default selectedBlogReducer