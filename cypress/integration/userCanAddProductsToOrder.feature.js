describe('User can add products to their order', () => {
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

  describe('when clicking the Add To Order button of the first product ', () => {
    it('user gets a confirmation message after adding a product to order', () => {
      cy.get("[data-cy='btn-add-product1']").click()
      cy.get("[data-cy='order-message']").should(
        'contain',
        'The product has been added to your order successfully. (1 × Mandu)'
      )
      cy.get("[data-cy='items-count-message']").should(
        'contain',
        'You have 1 item in your order.'
      )
    })
  })

  describe('when clicking the Add To Order button of the second product ', () => {
    it('user gets a confirmation message after adding a product to order', () => {
      cy.get("[data-cy='btn-add-product1']").click()
      cy.get("[data-cy='btn-add-product2']").click()
      cy.get("[data-cy='order-message']").should(
        'contain',
        'The product has been added to your order successfully. (1 × Bibimbap)'
      )
      cy.get("[data-cy='items-count-message']").should(
        'contain',
        'You have 2 items in your order.'
      )
    })
  })
})
