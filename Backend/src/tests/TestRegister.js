const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
describe("POST /api/register", function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should register a user", async () => {
    const res = await request(app).post("/api/register").send(validUser);

    expect(res.status).to.equal(201);
  });
});

/*run single test script */
///$ npx mocha src/tests/TestRegister.js
