describe('User can review their order', () => {
  beforeEach(() => {
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
  })

  it("user can't see View Order button before adding products", () => {
    cy.get("[data-cy='btn-view-order']").should('not.exist')
  })

  it('user can see the list of their order', () => {
    cy.get("[data-cy='btn-add-product1']").click()
    cy.get("[data-cy='btn-add-product2']").click()
    cy.get("[data-cy='btn-view-order']").click()
    cy.get("[data-cy='order-details']").within(() => {
      cy.contains('1 × Mandu')
      cy.contains('1 × Bibimbap')
      cy.contains('Total Price: 20')
    })
  })

  it('user can hide their order by clicking View Order button', () => {
    cy.get("[data-cy='btn-add-product1']").click()
    cy.get("[data-cy='btn-add-product2']").click()
    cy.get("[data-cy='btn-view-order']").click()
    cy.get("[data-cy='btn-view-order']").click()
    cy.get("[data-cy='order-list']").should('not.exist')
  })
})
