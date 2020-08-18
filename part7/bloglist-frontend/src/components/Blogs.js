import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  List,
  ListItem,
  Paper
} from '@material-ui/core'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

import {
  fetchBlogsActionCreator,
  createBlogActionCreator
} from '../reducers/blogsReducer'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  blogList: {
    margin: '32px 0px'
  }
})

const Blogs = () => {
  const classes = useStyles()
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogsActionCreator())
  })

  if (!blogs) {
    return null
  }

  const handleClickCreate = (title, author, url) => {
    dispatch(createBlogActionCreator(title, author, url))
  }

  const sortBlogList = blogs => {
    return blogs.sort((blogFirst, blogSecond) => {
      return blogSecond.likes - blogFirst.likes
    })
  }

  return (
    <Container>
      <Togglable buttonLabel="New Blog">
        <BlogForm
          handleClickCreate={handleClickCreate}
        />
      </Togglable>
      <List component={Paper} className={classes.blogList} id="blog-list">
        {sortBlogList(blogs).map(blog => (
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.id}`}
            divider
          >
            {blog.title}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Blogs