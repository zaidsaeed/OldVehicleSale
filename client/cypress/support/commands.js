Cypress.Commands.add("login", (username, password) => {
  cy.visit("http://localhost:3000");
  cy.url().should("not.include", "/login");
  cy.get(".btn-light").click();
  cy.url().should("include", "/login");

  //Fill out form
  cy.get('input[name="email"]').type(username).should("have.value", username);

  cy.get('input[name="password"]')
    .type(password)
    .should("have.value", password);

  cy.get('input[type="submit"]').click();

  cy.url().should("not.include", "/login");

  cy.url().should("include", "/dashboard");
});
