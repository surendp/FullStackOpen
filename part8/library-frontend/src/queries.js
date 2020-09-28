import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks(
    $genre: String
  ) {
    allBooks(
      genre: $genre
    ) {
      title
      published
      genres
      id
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      born
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const NEW_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

const SET_BIRTHYEAR = gql`
  mutation setBirthYear(
    $name: String!
    $born: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name,
      born,
      id,
      bookCount
    }
  }
`

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_ADDED,
  LOGIN,
  ME,
  NEW_BOOK,
  SET_BIRTHYEAR
}