describe("Visitors can see a collection of products", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/products",
      response: "fixture:products_index.json",
    });
    cy.visit("/");
  });

  it("successfully", () => {
    cy.get("[data-cy='products-index']").within(() => {
      cy.contains("Mandu");
      cy.contains("Bibimbap");
      cy.contains("Bulgogi");
      cy.contains("Sujeonggwa");
      cy.contains("Hodduk");
    });
  });
});
