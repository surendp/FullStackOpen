import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, ME, NEW_BOOK } from '../queries'

const NewBook = ({
  show,
  setError
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [newBook] = useMutation(NEW_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      const newBook = response.data.addBook

      // update the all books data
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [
            ...dataInStore.allBooks,
            newBook
          ]
        }
      })

      //  read favorite genre of logged in user
      const { favoriteGenre } = store
        .readQuery({ query: ME })
        .me

      // do nothing if the favorite genre is not present
      if (!newBook.genres.join(' ').includes(favoriteGenre)) {
        return
      }

      // read the recommended books data
      const recommendedBooksInStore = store.readQuery({
        query: ALL_BOOKS,
        variables: { genre: favoriteGenre }
      })
  
      // update the recommended books data
      store.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: favoriteGenre },
        data: {
          ...recommendedBooksInStore,
          allBooks: [
            ...recommendedBooksInStore.allBooks,
            newBook
          ]
        }
      })
    },
    onError: error => {
      setError(error.message)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    newBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook