describe("Visitors can create an account", () => {
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
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:successful_login.json",
      headers: {
        uid: "test@test.com",
      },
    });

    cy.visit("/");
  });

  it("successfully", () => {
    cy.get("[data-cy='input-email']").type("test@test.com");
    cy.get("[data-cy='input-password']").type("password");
    cy.get("[data-cy='input-password-confirmation']").type("password");
    cy.get("[data-cy='btn-submit']").click();
    cy.get("[data-cy='message']").should("contain", "Welcome, test@test.com!");
  });
});
