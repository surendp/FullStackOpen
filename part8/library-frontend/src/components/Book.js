import React from 'react'

const Book = ({ book }) => (
  <tr>
    <td>{book.title}</td>
    <td>{book.author}</td>
    <td>{book.published}</td>
  </tr>
)

export default Book