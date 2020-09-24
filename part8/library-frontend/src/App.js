import { useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import {
  ALL_AUTHORS, ALL_BOOKS
} from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  // effect hook
  useEffect(() => {
    // extract token from local storage
    const extractedToken = localStorage.getItem('library-user-token')

    // set token to the component state
    if (extractedToken) {
      setToken(extractedToken)
    }
  }, [])

  if (allAuthorsResult.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  // set error message to the component state for 10 seconds
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // clear the token from the localstorage, component state
  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('books')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? (<>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={logout}>Logout</button>
              </>)
            : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={allAuthorsResult.data.allAuthors}
        setError={notify}
        authenticated={!!token}
      />

      <Books
        show={page === 'books'}
        books={allBooksResult.data.allBooks}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      {
        token
          ? (<Recommend
              show={page === 'recommend'}
            />)
          : null
      }
      
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{
      color: 'red',
      margin: '8px 0px'
    }}>
    {errorMessage}
    </div>
  )
}

export default App