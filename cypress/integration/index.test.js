describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The index page should contain an h1
      cy.get("h1").contains("All your code snippets in one single place");
    // The index page should contain an image
      cy.get("img")
  });
});
