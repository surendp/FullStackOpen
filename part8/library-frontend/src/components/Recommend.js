import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries'
import Book from './Book'

const Recommend = ({
  show,
  books
}) => {
  const me = useQuery(ME)

  if (!show) {
    return null
  }

  if (me.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = me.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        {'books in your favourite genre'}
        <strong>{` ${favoriteGenre}`}</strong>
      </div>

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
            books
              .filter(book => book.genres.join(' ').includes(favoriteGenre))
              .map(book => <Book key={book.id} book={book} />)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend