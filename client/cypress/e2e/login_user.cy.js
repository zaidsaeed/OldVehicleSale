describe("Login user Spec", () => {
  it("Logs in a User", async () => {
    //Navigate to user log in page
    cy.visit("http://localhost:3000");
    cy.url().should("not.include", "/login");
    cy.get(".btn-light").click();
    cy.url().should("include", "/login");

    //Fill out form
    cy.get('input[name="email"]')
      .type("dummyaccount@gmail.com")
      .should("have.value", "dummyaccount@gmail.com");

    cy.get('input[name="password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[type="submit"]').click();

    cy.url().should("not.include", "/login");

    cy.url().should("include", "/dashboard");
  });
});
