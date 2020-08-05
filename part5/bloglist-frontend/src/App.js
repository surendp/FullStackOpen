import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )

    if (user) {
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleClickCreate = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`A new blog, ${newBlog.title} by ${newBlog.author}, added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (err) {
      setErrorMessage(err.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleClickLike = blog => {
    let updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    return async () => {
      try {
        updatedBlog = await blogService
          .update(updatedBlog)
        setBlogs(
          blogs.map(blog => {
            if (blog.id.toString() === updatedBlog.id.toString()) {
              return {
                ...blog,
                likes: blog.likes + 1,
              }
            }
            return blog
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleClickDelete = blog => {
    return async () => {
      const confirm = window.confirm(`Remove blog ${blog.title}`)
      if (!confirm) {
        return
      }

      try {
        await blogService.remove(blog)
        setBlogs(
          blogs.filter(
            b => b.id.toString() !== blog.id.toString()
          )
        )
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      {
        errorMessage ? (
          <Notification
            message={errorMessage}
            isError
          />
        ) : null
      }
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )

  const sortBlogList = blogs => {
    return blogs.sort((blogFirst, blogSecond) => {
      return blogSecond.likes - blogFirst.likes
    })
  }

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {
        errorMessage ? (
          <Notification
            message={errorMessage}
            isError
          />
        ) : null
      }
      {
        successMessage ? (
          <Notification
            message={successMessage}
          />
        ) : null
      }
      <h4>
        {`${user.name} logged in`}
        <button onClick={handleLogout}>logout</button>
      </h4>
      <Togglable buttonLabel="New Blog">
        <BlogForm
          handleClickCreate={handleClickCreate}
        />
      </Togglable>
      <div id="blog-list">
        {sortBlogList(blogs).map(blog =>
          <Blog
            loggedUser={user}
            key={blog.id}
            blog={blog}
            handleClickLike={handleClickLike(blog)}
            handleClickDelete={handleClickDelete(blog)}
          />
        )}
      </div>
    </>
  )

  return (
    <div>
      {user ? null : loginForm()}
      {user ? blogList() : null}
    </div>
  )
}

export default App