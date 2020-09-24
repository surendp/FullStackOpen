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
      title
      published
      genres
      id
      author {
        name
        born
      }
    }
  }
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
  LOGIN,
  ME,
  NEW_BOOK,
  SET_BIRTHYEAR
}