const request = require("supertest");
const app = require("../../app.js");
const db = require("./db.js");

describe("Should Create A Post", () => {
  beforeAll(async () => {
    await db.connect();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });
  it("Should Create A Post", async () => {
    const logInResponse = await request(app)
      .post("/api/users/login")
      .set("content-type", "application/json")
      .send({
        name: "task testing",
        completed: "true",
      });

    // console.log("logInResponse", logInResponse);
  });
});
