"use strict"

const request = require("supertest")

const app = require("../app")

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/routes/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** POST /auth/token */

describe("Auth Routes", () => {
  describe("POST /auth/token/", function () {
    test("User can login successfully with valid credentials", async function () {
      const res = await request(app).post("/auth/token/").send({
        email: "lebron@james.io",
        password: "password",
      })
      expect(res.body).toEqual({
        token: expect.any(String),
      })
    })

    test("Throws Unauthenticated error when user doesn't exist in db", async function () {
      const res = await request(app).post("/auth/token/").send({
        email: "somebody_else@users.io",
        password: "password",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Unauthenticated error when user provides wrong password", async function () {
      const res = await request(app).post("/auth/token/").send({
        email: "lebron@james.io",
        password: "nope",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Unprocessable Entity error when user doesn't provide password", async function () {
      const res = await request(app).post("/auth/token/").send({
        email: "lebron@james.io",
      })
      expect(res.statusCode).toEqual(422)
    })

    test("Throws Unprocessable Entity error when user doesn't provide email", async function () {
      const res = await request(app).post("/auth/token/").send({
        password: "password",
      })
      expect(res.statusCode).toEqual(422)
    })
  })

  /************************************** POST /auth/register */
  describe("POST /auth/register/", function () {
    test("Allows user to register with valid credentials", async function () {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
        firstName: "first",
        lastName: "last",
        password: "password",
        email: "new@email.com",
      })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual({
        token: expect.any(String),
      })
    })

    test("Throws Unprocessable Entity error when user doesn't provide all fields", async function () {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
      })
      expect(res.statusCode).toEqual(422)
    })
  })
})
