describe('User can check out thier order', () => {
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
  it('by filling in valid credit card information', () => {
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/api/orders/**',
      response: { finalized: true },
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/payments',
      response: {
        message: 'Thank you! Your order will be ready in 20 minutes.',
      },
    })
    cy.get("[data-cy='btn-confirm-order']").click()
    cy.get("[data-cy='payment-form']").within(() => {
      cy.get('[data-cy="card-number"]').within(() => {
        cy.wait(1000)
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find('body')
          cy.wrap($body)
            .find('input[name="cardnumber"]')
            .type('4242424242424242', { delay: 10 })
        })
      })
      cy.get('[data-cy="card-expiry"]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find('body')
          cy.wrap($body)
            .find('input[name="exp-date"]')
            .type('1222', { delay: 10 })
        })
      })
      cy.get('[data-cy="card-cvc"]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find('body')
          cy.wrap($body).find('input[name="cvc"]').type('424', { delay: 10 })
        })
      })
      cy.get("[data-cy='btn-payment']").click()
    })
    cy.get("[data-cy='payment-message']").should(
      'contain',
      'Thank you! Your order will be ready in 20 minutes.'
    )
  })
})
