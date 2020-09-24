import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'
import Book from './Book'

const Recommend = ({
  show
}) => {
  const myInfo = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [recommendedBooks, setRecommendedBooks] = useState(null)

  // effect hook
  useEffect(() => {
    // get all books filtered by favorite genre
    if (myInfo.data) {
      getBooks({
        variables: { genre: myInfo.data.me.favoriteGenre }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myInfo.data])

  // effect hook
  useEffect(() => {
    if (result.data) {
      setRecommendedBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  // destructure favoriteGenre
  const { favoriteGenre } = myInfo.data.me

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
            recommendedBooks
              .filter(book => book.genres.join(' ').includes(favoriteGenre))
              .map(book => <Book key={book.id} book={book} />)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend