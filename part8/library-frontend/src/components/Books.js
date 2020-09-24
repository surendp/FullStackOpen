import React, { useState } from 'react'
import Book from './Book'
import Genres from './Genres'

const Books = ({
  show,
  books
}) => {
  const [genre, setGenre] = useState(null)

  if (!show) {
    return null
  }

  const handleClickGenre = genre => () => {
    setGenre(genre)
  }

  // filter books based on the genre
  const filteredBooks = () => books.filter(b => b
    .genres
    .join(' ')
    .includes(genre))

  return (
    <div>
      <h2>books</h2>

      <Genres
        handleClickGenre={handleClickGenre}
      />

      {
        genre
          ? <h4>in genre <strong>{` ${genre}`}</strong></h4>
          : null
      }

      <table>
        <tbody>
          <tr>
            <th>
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            genre
              ? filteredBooks(books).map(book => <Book key={book.id} book={book} />)
              : books.map(book => <Book key={book.id} book={book} />)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books