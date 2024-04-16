const request = require("supertest");
const app = require("../../app.js");
const db = require("./db.js");

describe("Should Delete A Post", () => {
  beforeAll(async () => {
    await db.connect();
    await db.loadData();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  it("Should Delete A Post", async () => {
    const logInResponse = await request(app)
      .post("/api/users/login")
      .set("content-type", "application/json")
      .send({
        email: "dummyaccount@gmail.com",
        password: "password",
      })
      .expect(200);

    const deletePostRequest = await request(app)
      .delete("/api/posts")
      .set("content-type", "application/json")
      .set("Authorization", logInResponse.body.token)
      .send({ model: "Dummy model" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        if (!res.body.hasOwnProperty("success"))
          throw new Error("Expected 'status' key!");
      });
  });
});
