describe('User can finalize their order', () => {
  before(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/products',
      response: 'fixture:products_index.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth',
      response: 'fixture:registration.json',
      headers: {
        uid: 'test@test.com',
      },
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/sign_in',
      response: 'fixture:successful_login.json',
      headers: {
        uid: 'test@test.com',
      },
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/orders',
      response: 'fixture:first_product_added_to_order.json',
    })
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/api/orders/**',
      response: 'fixture:second_product_added_to_order.json',
    })
    cy.visit('/')
    cy.get("[data-cy='btn-sign-up']").click()
    cy.get("[data-cy='input-email']").type('test@test.com')
    cy.get("[data-cy='input-password']").type('password')
    cy.get("[data-cy='input-password-confirmation']").type('password')
    cy.get("[data-cy='btn-submit']").click()
    cy.get("[data-cy='btn-add-product1']").click()
    cy.get("[data-cy='btn-add-product2']").click()
    cy.get("[data-cy='btn-view-order']").click()
  })
  it('successfully', () => {
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/api/orders/**',
      response: { finalized: true },
    })
    cy.get("[data-cy='btn-confirm-order']").click()
    cy.get("[data-cy='payment-form']").should('be.visible')
  })
})
