describe("Create user Spec", () => {
  it("Creates a User", () => {
    //Navigate to user sign up page
    cy.visit("http://localhost:3000");
    cy.url().should("not.include", "/register");
    cy.get(".btn-info").click();
    cy.url().should("include", "/register");

    //Fill out form
    cy.get('input[name="name"]')
      .type("Zaid Saeed")
      .should("have.value", "Zaid Saeed");

    cy.get('input[name="email"]')
      .type("saeedzaid003@gmail.com")
      .should("have.value", "saeedzaid003@gmail.com");

    cy.get('input[name="password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[name="password2"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[type="submit"]').click();

    // cy.url().should("not.include", "/register");

    // cy.url().should("include", "/dashboard");
  });
});
