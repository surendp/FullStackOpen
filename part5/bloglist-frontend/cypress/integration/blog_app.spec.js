describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'johndow',
        password: 'dow1234',
        name: 'John Dow'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('johndow')
      cy.get('#password').type('dow1234')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('johndow')
      cy.get('#password').type('dow123')
      cy.get('#login-button').click()
      cy.contains('Log in to application')

      // having css class 'error' confirms the text color to be red
      cy.get('#notification')
        .should('have.class', 'error')
    })
  })

  describe.only('When logged in', function() {
    // assign token to authorization header from localstorage
    const headers = () => ({
      Authorization: `bearer ${
        JSON.parse(
          window
            .localStorage
            .getItem('loggedBlogAppUser')
        ).token
      }`
    })

    beforeEach(function() {
      const user = {
        username: 'johndow',
        password: 'dow1234',
        name: 'John Dow'
      }

      // create a new user in the database
      cy.request('POST', 'http://localhost:3001/api/users', user)

      cy.contains('Log in to application')

      // login as a user in the application
      // and store the token in the local storage
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'johndow',
        password: 'dow1234',
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()

      cy.get('#title').type('New blog using cypress')
      cy.get('#author').type('John dow')
      cy.get('#url').type('johndow.com')
      cy.get('#create').click()

      cy.contains('New blog using cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        const blog = {
          title: 'Another blog using cypress',
          author: 'John dow',
          url: 'dow.com',
        }

        // create a new blog using API end point
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: blog,
          headers: headers()
        })

        cy.visit('http://localhost:3000/')
      })

      it('it can be liked', function() {
        cy.contains('view')
          .click()

        cy.contains('like')
          .click()

        cy.contains('1')
      })

      it('it can be deleted', function() {
        cy.contains('view')
          .click()

        cy.contains('remove')
          .click()

        cy.get('#blog-list')
          .should('not.contain', 'Another blog using cypress')
      })

      it('other users cannot delete the blog', function() {
        cy.request('POST', 'http://localhost:3001/api/users', {
          username: 'abc',
          password: 'abc1234',
          name: 'ABC',
        })

        cy.contains('logout')
          .click()

        cy.contains('Log in to application')

        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'abc',
          password: 'abc1234',
        }).then(response => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })

        cy.contains('Another blog using cypress')
        cy.contains('view')
          .click()
        cy.get('#blog-list')
          .should('not.contain', 'remove')
      })
    })

    describe('and multiple blogs exists', function() {
      // blog list in random order
      const blogList = [
        {
          title: 'Blog with maximum likes',
          author: 'john dow',
          likes: 10,
          url: 'dow.com'
        },
        {
          title: 'Blog with 4 likes',
          author: 'john dow',
          likes: 4,
          url: 'dow.com'
        },
        {
          title: 'Blog with 5 likes',
          author: 'john dow',
          likes: 5,
          url: 'dow.com'
        },
        {
          title: 'Blog with minimum likes',
          author: 'john dow',
          likes: 1,
          url: 'dow.com'
        }
      ]

      beforeEach(function() {
        // save blogs to the database
        blogList.forEach(blog => {
          cy.request({
            url: 'http://localhost:3001/api/blogs',
            method: 'POST',
            body: blog,
            headers: headers()
          })
        })
        cy.visit('http://localhost:3000')
      })

      it('blogs are ordered according to likes in descending order', function() {
        // order the bloglist on the basis of number of likes
        const orderedBlogList = blogList.sort((blog1, blog2) => {
          return blog2.likes - blog1.likes
        })

        orderedBlogList.forEach((blog, index) => {
          // check if the rendered list is in descending order
          cy.get('.blog')
            .eq(index)
            .should('contain', blog.title)
        })
      })
    })
  })
})