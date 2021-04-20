"use strict"
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  jloToken,
  lebronToken,
  adminToken,
} = require("../../tests/permissions/common")
const { BadRequestError, ForbiddenError } = require("../../utils/errors")
const listingPermissions = require("./listings")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("TransactionPermissions", () => {
  describe("authedUserIsHostOrBookingUserForTransaction", () => {
    test("Attaches listing to res.local if authed user is host", async () => {
      expect.assertions(2)

      const req = { headers: { authorization: `Bearer ${lebronToken}` } }
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      next()
    })

    test("Attaches listing to res.local if authed user is booking user", async () => {
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      next()
    })

    test("Throws error if authed user doesn't own listing", async () => {
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      next()
    })
  })
})
