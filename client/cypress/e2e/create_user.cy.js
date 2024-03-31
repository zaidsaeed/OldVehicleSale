describe("Create user Spec", () => {
  it("Creates a User", async () => {
    //Navigate to user sign up page
    cy.visit("http://localhost:3000");
    cy.url().should("not.include", "/register");
    cy.get(".btn-info").click();
    cy.url().should("include", "/register");

    //Fill out form
    cy.get('input[name="name"]')
      .type("Test Account")
      .should("have.value", "Test Account");

    cy.get('input[name="email"]')
      .type("testaccount@gmail.com")
      .should("have.value", "testaccount@gmail.com");

    cy.get('input[name="password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[name="password2"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[type="submit"]').click();

    cy.url().should("not.include", "/register");

    cy.url().should("include", "/dashboard");

    // Login to get auth token
    cy.request(
      "POST",
      "https://oldvehiclesalebackend.onrender.com/api/users/login",
      {
        email: "testaccount@gmail.com",
        password: "password",
      }
    ).then((response) => {
      const deleteRequestOptions = {
        method: "DELETE",
        url: "https://oldvehiclesalebackend.onrender.com/api/users/testaccount@gmail.com",
        headers: { Authorization: `${response.body.token}` },
      };
      cy.request(deleteRequestOptions);
    });
  });
});
