import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({
  show,
  setError,
  setToken,
  setPage
}) => {
  // component states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // use login mutation
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  // effect hook
  useEffect(() => {
    // when the data arrives, extract the token, and
    // save it to application state and local storage
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('books')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  // event handler to submit the data
  const submit = event => {
    event.preventDefault()
    login({
      variables: {
        username,
        password
      }
    })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm