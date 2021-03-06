import React from 'react'
import BirthYearForm from './BirthYearForm'

const Authors = ({
  show,
  authors,
  setError,
  authenticated
}) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {
        authenticated
          ? (
              <BirthYearForm
                setError={setError}
                authors={authors}
              />
            )
          : null
      }
    </div>
  )
}

export default Authors
