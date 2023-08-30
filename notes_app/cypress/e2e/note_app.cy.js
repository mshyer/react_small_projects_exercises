// function logIn() {
//   cy.contains('log in').click();
//   cy.get('#username').type('mikmik');
//   cy.get('#password').type('12345');
//   cy.get('#login-button').click();
//   cy.contains('logged in')
// }

// function logIn() {
//   cy.request('POST', 'http://localhost:3001/api/login', {
//     username: 'mikmik', password: '12345'
//   }).then(response => {
//     localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
//     cy.visit('http://localhost:3000')
//   })
// }

Cypress.Commands.add(
  'login',
  ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  }
);

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
});

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Note app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', Cypress.env('BACKEND') + '/testing/reset');
    const user = {
      name: 'mikmik',
      username: 'mikmik',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');

  })
  it('login fails with wrong password', function() {
    // console.log(Cypress.env('BACKEND'))
    // console.log('Cypress.env(BACKEND) :>> ', Cypress.env('BACKEND'));
    cy.contains('log in').click()
    cy.get('#username').type('mikmik')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    // setTimeout(() => {
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
      // cy.contains('wrong credentials')
    // }, 2000)
    cy.contains('mikmik logged in').should('not.exist')
  })

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023');
  })

  it('login form can be opened', function() {
    cy.contains('log in').click();
  });

  it('user can login', function() {
    cy.contains('log in').click();
    cy.get('#username').type('mikmik');
    cy.get('#password').type('12345');
    cy.get('#login-button').click();
    cy.contains('logged in')
  });

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('log in').click();
      // cy.get('#username').type('mikmik');
      // cy.get('#password').type('12345');
      // cy.get('#login-button').click();
      // logIn();
      cy.login({ username: 'mikmik', password: '12345' })
    });

    it('a new note can be created', function() {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function() {
      // beforeEach(function() {
      //   cy.contains('new note').click();
      //   cy.get('input').type('another note cypress');
      //   cy.contains('save').click();
      // })
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        });
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress').parent().find('button')
          .should('contain', 'make not important')
          .click();
        cy.contains('another note cypress').parent().find('button')
          .should('contain', 'make important')
      })
    });

    describe('and several notes exist', function() {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
        // cy.debug();
      })


      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click();
        // .contains('make important')
        // .click()

        // cy.contains('second note').parent().find('button')
        cy.get('@theButton').should('contain', 'make not important');
      })
    })
  });

})