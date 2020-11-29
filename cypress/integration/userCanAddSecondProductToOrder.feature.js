describe("Adding multiple products to an order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:successful_sign_up.json",
      headers: {
        uid: "user@mail.com",
        access_token: "token",
        client: "12345",
        token_type: "Bearer",
        expiry: 1000000,
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/orders",
      response: "fixture:first_product_added_to_order.json",
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/orders/**",
      response: "fixture:second_product_added_to_order.json",
    });

    cy.visit("/");
    cy.get('[data-cy="register-action"]').click();
    cy.get('[data-cy="email"]').type("user@mail.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="password-confirmation"]').type("password");
    cy.get('[data-cy="register"]').click();
  });

  it("is expected to get a confirmation message when adding a product to order", () => {
    cy.get('[data-cy="view-button"]').should("not.exist");

    cy.get('[data-cy="product-2"]').within(() => {
      cy.get('[data-cy="button"]').click();
    });
    cy.get('[data-cy="message"]').should("contain", "Product was successfully added to your order!"
    );

    cy.get('[data-cy="view-button"]').should("exist");

    cy.get('[data-cy="product-3"]').within(() => {
      cy.get('[data-cy="button"]').click();});
    cy.get('[data-cy="message"]').should(
      "contain",
      "Product was successfully added to your order!"
    );

    cy.get('[data-cy="view-button"]').click();
    cy.get('[data-cy="order-details"]').within(() => {
      cy.get("li")
        .should("have.length", 2)
        .first().should('have.text', 'Entrecôte with chanterelle sauce and potato gratin')
        .next().should('have.text', 'Reindeer tartare')
    });
    cy.get('[data-cy="view-button"]').click();
    cy.get('[data-cy="order-details"]').should("not.exist");
  });

  it("user can finalize the order", () => {
    cy.get('[data-cy="product-2"]').within(() => {
      cy.get('[data-cy="button"]').click();
    });
    cy.get('[data-cy="product-3"]').within(() => {
      cy.get('[data-cy="button"]').click();
    });
    cy.get('[data-cy="view-button"]').click();
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/orders/1",
      response: { message: "Your order will be ready in 20 minutes" },
    });
    cy.get('[data-cy="confirm-button"]').contains("Confirm!").click();
    cy.get('[data-cy="message"]').should(
      "contain",
      "Your order will be ready in 20 minutes"
    );
  });

});
