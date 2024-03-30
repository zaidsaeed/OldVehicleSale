describe("Create user Spec", () => {
  it("Creates a User", () => {
    //Navigate to user sign up page
    cy.visit("http://localhost:3000");
    cy.url().should("not.include", "/register");
    cy.get(".btn-info").click();
    cy.url().should("include", "/register");
  });
});
