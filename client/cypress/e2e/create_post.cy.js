describe("Create Post Spec", function () {
  beforeEach(() => {
    cy.login("dummyaccount@gmail.com", "password");
  });

  it("Create New Post", function () {
    cy.get(".test-add-post-button").click();

    cy.get('input[name="carModel"]')
      .type("Tesla Model S")
      .should("have.value", "Tesla Model S");

    cy.get('input[name="imageURL"]')
      .type("http://tesla-model-s.com")
      .should("have.value", "http://tesla-model-s.com");

    cy.get('input[name="price"]').type("100").should("have.value", "100");

    cy.get('textarea[name="description"]')
      .type("Amazing car with amazing interior")
      .should("have.value", "Amazing car with amazing interior");

    cy.get('input[type="submit"]').click();

    cy.url().should("not.include", "/createPost");

    cy.url().should("include", "/dashboard");

    // Login to get auth token
    cy.request(
      "POST",
      "https://oldvehiclesalebackend.onrender.com/api/users/login",
      {
        email: "dummyaccount@gmail.com",
        password: "password",
      }
    ).then((response) => {
      const deleteRequestOptions = {
        method: "DELETE",
        url: `https://oldvehiclesalebackend.onrender.com/api/posts`,
        headers: { Authorization: `${response.body.token}` },
        body: {
          model: "Tesla Model S",
        },
      };
      cy.request(deleteRequestOptions);
    });
  });
});
