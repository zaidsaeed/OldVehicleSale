describe("Create Profile Spec", function () {
  beforeEach(() => {
    cy.login("dummyaccount@gmail.com", "password");
  });

  it.only("Create New Profile", function () {
    cy.get(".create-profile-testing").click();

    cy.get('input[name="handle"]')
      .type("Test Account")
      .should("have.value", "Test Account");

    cy.get('input[name="location"]')
      .type("Location")
      .should("have.value", "Location");

    cy.get('input[name="email"]')
      .type("testaccount@gmail.com")
      .should("have.value", "testaccount@gmail.com");

    cy.get('input[name="phone"]')
      .type("8193297428")
      .should("have.value", "8193297428");

    cy.get('input[type="submit"]').click();

    cy.url().should("not.include", "/create-profile");

    cy.url().should("include", "/dashboard");
  });
});
