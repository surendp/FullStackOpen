import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


const blog = {
  title: 'Testin blog component',
  author: 'John dow',
  url: 'google.com',
  likes: 10,
  user: {
    name: 'John Dow',
    id: '123456',
    userName: 'johndow',
  },
}

const loggedUser = {
  id: '123456',
}

test('Blog\'s url and likes are not rendered by default', () => {
  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleClickDelete={jest.fn()}
      handleClickLike={jest.fn()}
    />
  )

  expect(component.container)
    .not
    .toHaveTextContent(blog.url)

  expect(component.container)
    .not
    .toHaveTextContent(blog.likes)
})

test('Blog\'s url and likes are shown after clicking the button', () => {
  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleClickDelete={jest.fn()}
      handleClickLike={jest.fn()}
    />
  )

  const button = component
    .container
    .querySelector('.blog-toggle-button')

  // button click
  fireEvent.click(button)

  expect(component.container)
    .toHaveTextContent(blog.url)

  expect(component.container)
    .toHaveTextContent(blog.likes)
})

test('Event handler is called twice when the like button is clicked twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleClickDelete={jest.fn()}
      handleClickLike={mockHandler}
    />
  )

  // click hidden content toggle button
  fireEvent.click(
    component
      .container
      .querySelector('.blog-toggle-button')
  )

  const button = component
    .container
    .querySelector('.blog-like-button')

  // click like button twice
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls)
    .toHaveLength(2)
})

test('Form calls the submit event handler with the right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm
      handleClickCreate={createBlog}
    />
  )

  const form = component.container.querySelector('form')
  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')

  fireEvent.change(inputTitle, {
    target: {
      value: blog.title,
    }
  })

  fireEvent.change(inputAuthor, {
    target: {
      value: blog.author,
    }
  })

  fireEvent.change(inputUrl, {
    target: {
      value: blog.url,
    }
  })

  fireEvent.submit(form)

  const createBlogCalls = createBlog.mock.calls
  expect(createBlogCalls[0][0]).toBe(blog.title)
  expect(createBlogCalls[0][1]).toBe(blog.author)
  expect(createBlogCalls[0][2]).toBe(blog.url)
})