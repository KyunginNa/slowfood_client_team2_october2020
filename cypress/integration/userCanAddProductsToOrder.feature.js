describe("User can add a product to their order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:products_index.json",
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:registration.json",
      headers: {
        uid: "test@test.com",
      },
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/orders",
      response: {
        message: "The product has been added to your order successfully.",
      },
    });
    cy.visit("/");
    cy.get("[data-cy='input-email']").type("test@test.com");
    cy.get("[data-cy='input-password']").type("password");
    cy.get("[data-cy='input-password-confirmation']").type("password");
    cy.get("[data-cy='btn-submit']").click();
  });
  it("user gets a confirmation message after adding a product to order", () => {
    cy.get("[data-cy='btn-add-product1']").click();
    cy.get("[data-cy='order-message']").should(
      "contain",
      "The product has been added to your order successfully."
    );
  });
});
