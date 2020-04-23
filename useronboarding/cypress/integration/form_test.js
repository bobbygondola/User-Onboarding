it('is equal?', () => {
    expect(true).to.equal(true)
})

//variables
const url = "http://localhost:3000/"
const name = "Bobby"
const email = "Bobertgondola@gmail.com"
const password = "Password"

describe('my first test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit(url)
    })
})

describe('Form Filer', () => {
it('can submit a new team member', () => {
    cy.get('input[name="name"]')
    .type(name)

    cy.get('input[name="email"]')
    .type(email)

    cy.get('input[name="password"]')
    .type(password)

    cy.contains("Submit").click()
})
})