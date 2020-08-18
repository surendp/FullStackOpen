import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import authenticationReducer from './reducers/authenticationReducer'
import usersReducer from './reducers/usersReducer'
import selectedUserReducer from './reducers/selectedUserReducer'
import selectedBlogReducer from './reducers/selectedBlogReducer'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  authentication: authenticationReducer,
  users: usersReducer,
  selectedUser: selectedUserReducer,
  selectedBlog: selectedBlogReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store