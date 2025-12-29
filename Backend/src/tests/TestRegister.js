const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

describe("POST /api/register", function () {
  this.timeout(10000);

  beforeEach(async () => {
    // Ensure test DB is clean
    await User.deleteMany({});
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  const validUser = {
    username: "testuser",
    password: "password123",
    firstname: "Test",
    lastname: "User",
    birthdate: "1998-01-01",
    age: 26,
    gender: "male",
    phonenumber: "09123456789",
    email: "test@example.com",
    address: "123 Test Street",
    city: "Manila",
    state: "NCR",
    barangay: "Barangay 1",
    province: "Metro Manila",
    zip: "1000",
    telephone: "1234567",
    role: "user",
    location: "PH",
  };

  it("✅ should register a new user successfully", async () => {
    const res = await request(app).post("/api/register").send(validUser);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("User registered successfully");
    expect(res.body.user).to.have.property("username", "testuser");
    expect(res.body.user)
      .to.have.property("password")
      .that.is.not.equal(validUser.password);
  });

  it("❌ should fail if required fields are missing", async () => {
    const res = await request(app).post("/api/register").send({
      username: "baduser",
      password: "123",
    });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("All required fields must be filled");
  });

  it("❌ should not allow duplicate username/email/phone", async () => {
    const res = await request(app).post("/api/register").send(validUser);

    expect(res.status).to.equal(409);
    expect(res.body.message).to.equal(
      "Username, email, or phone number already in use"
    );
  });
});

/*run single test script */
///$ npx mocha src/tests/TestRegister.js
