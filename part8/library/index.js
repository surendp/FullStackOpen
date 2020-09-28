const {
  ApolloServer,
  gql,
  UserInputError,
  PubSub
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const pubsub = new PubSub()

const JWT_SECRET = 's3cr3t'
const MONGODB_URI = 'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

// Establish database connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// GraphQL type definations
const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    bookOf: [Book!]!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    bookCount(author: String): Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

// GraphQL Resolvers
const resolvers = {
  Author: {
    bookCount: root => {      
      return root.bookOf.length
    },
  },

  Query: {
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      if (args.genre) {
        // return the books list by genre
        return await Book.find({
          genres: { $eq: args.genre }
        }).populate('author')
      }

      const books = await Book.find({})
        .populate('author')
      return books
    },
    allAuthors: (root, args) => {
      return Author.find({}).populate('bookOf')
    },
    bookCount: async () => {      
      const books = await Book.find({})
      return books.length
    },
    me: (root, args, { currentUser }) => {
      return currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // throw error if the logged in user doesnot exist
      if (!currentUser) {
        throw new UserInputError('Un-Authorized access denied')
      }

      // find the author in the database
      let author = await Author.findOne({ name: args.author })

      // create new author
      if (!author) {
        author = new Author({
          name: args.author
        })
        author = await author.save()
      }

      // create new book instance
      const book = new Book({
        ...args,
        author
      })

      try {
        // save the book to the database
        await book.save()

        // add the book to the author's book list
        author.bookOf = author.bookOf.concat(book._id)

        // save the author to the database
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
      // publish the newly added book to all the subscribers
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      // return newly created book
      return book
    },

    createUser: (root, args) => {
      // create new user instance
      const user = new User({
        ...args
      })
      
      // save the user to the database
      return user
        .save()
        .catch (error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },

    editAuthor: async (root, args, { currentUser }) => {
      // throw error if the logged in user doesnot exist
      if (!currentUser) {
        throw new UserInputError('Un-Authorized access denied')
      }

      // find author from database
      const author = await Author.findOne({ name: args.name })

      // throw error if user doesnot exist
      if (!author) {
        throw new UserInputError("User does not exist", {
          invalidArgs: args
        })
      }

      // update the birth date and save to the database
      author.born = args.setBornTo
      return (await author.save()).populate('author')
    },

    login: async (root, args) => {
      // find the user from the database
      const user = await User.findOne({ username: args.username })

      // throw error for worng credentials
      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong Credentials')
      }

      // data to create token
      const userForToken = {
        username: user.username,
        id: user._id
      }

      // create and return jwt token
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

// Server Instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // extract the authorization header
    const auth = req ? req.headers.authorization : null

    // check if the bearer token is provided
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      // decode the jwt token
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      // extract the user from the database
      const currentUser = await User
        .findById(decodedToken.id)
      
      // return the logged in user
      return { currentUser }
    }
  }
})

// Start the server
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})