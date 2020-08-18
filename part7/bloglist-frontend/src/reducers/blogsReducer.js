import blogService from '../services/blogs'

import {
  notificationActionCreator
} from './notificationReducer'

//action types
const FETCH_BLOGS = 'FETCH_BLOGS'
const CREATE_BLOG = 'CREATE_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'

// action creators
const fetchBlogsActionCreator = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: FETCH_BLOGS,
        payload: blogs
      })
    } catch (error) {
      console.error(error)
    }
  }
}

const createBlogActionCreator = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      dispatch({
        type: CREATE_BLOG,
        payload: newBlog
      })
      dispatch(notificationActionCreator(
        `A new blog, ${newBlog.title} by ${newBlog.author}, added`,
        false,
        5
      ))
    } catch (err) {
      dispatch(notificationActionCreator(
        err.response.data.error,
        true,
        5
      ))
    }
  }
}

const updateBlogActionCreator = modifiedBlog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService
        .update(modifiedBlog)
      dispatch({
        type: UPDATE_BLOG,
        payload: updatedBlog
      })
    } catch (err) {
      dispatch(notificationActionCreator(
        err.response.data.error,
        true,
        5
      ))
    }
  }
}

const deleteBlogActionCreator = blogToBeDeleted => {
  return async dispatch => {
    try {
      await blogService.remove(blogToBeDeleted)
      dispatch({
        type: DELETE_BLOG,
        payload: blogToBeDeleted
      })
    } catch (err) {
      dispatch(notificationActionCreator(
        err.response.data.error,
        true,
        5
      ))
    }
  }
}

// helper functions
const updateBlogHelper = (state, payload) => state.map(blog => {
  if (blog.id.toString() === payload.id.toString()) {
    return payload
  }
  return blog
})

const deleteBlogHelper = (state, payload) => state.filter(
  blog => blog.id.toString() !== payload.id.toString()
)


// reducer
const blogsReducer = (state = [], action) => {
  let newState = [ ...state ]
  const { type, payload } = action

  switch (type) {
    case FETCH_BLOGS:
      newState = [
        ...payload
      ]
      break

    case CREATE_BLOG:
      newState = [
        ...state,
        payload
      ]
      break

    case UPDATE_BLOG:
      newState = updateBlogHelper(state, payload)
      break

    case DELETE_BLOG:
      newState = deleteBlogHelper(state, payload)
      break

    default:
      break
  }

  return newState
}

export {
  fetchBlogsActionCreator,
  createBlogActionCreator,
  updateBlogActionCreator,
  deleteBlogActionCreator
}

export default blogsReducer