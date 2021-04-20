const { NotFoundError, BadRequestError, UnauthorizedError, UnprocessableEntityError } = require("../utils/errors")
const User = require("./user")
const Listing = require("./listing")
const Transaction = require("./transaction")
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/models/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

const listing = { id: "10", price: 23825, currency: "USD", owner: "lebron" }
const user = { username: "jlo" }
const commonTransaction = {
  id: "500",
  listingId: listing.id,
  bookingUsername: user.username,
  hostUsername: listing.owner,
  totalAmount: Number(listing.price) + Math.ceil(Number(listing.price) * 0.1),
  currency: listing.currency,
  paymentMethod: `card`,
  startDate: "12-12-2021",
  endDate: "12-14-2021",
}

describe("Transaction", () => {
  describe("create", () => {
    test("Can create a new transaction with valid params", async () => {
      const startDate = "12-12-2021"
      const endDate = "12-14-2021"

      const newTransaction = { listing, user, startDate, endDate }

      const transaction = await Transaction.create(newTransaction)

      expect(transaction.startDate).toEqual(startDate)
      expect(transaction.endDate).toEqual(endDate)
      expect(transaction.paymentMethod).toEqual("card")
      expect(transaction.hostUsername).toEqual("lebron")
      expect(transaction.bookingUsername).toEqual("jlo")
      expect(transaction.hostUser.username).toEqual("lebron")
      expect(transaction.bookingUser.username).toEqual("jlo")
    })

    test("Throws error with invalid params", async () => {
      const listing = { id: "10", totalAmount: 20000, currency: "USD", owner: "lebron" }
      const user = { username: "jlo" }

      const newTransaction = { listing, user }

      try {
        const transaction = await Transaction.create(newTransaction)
      } catch (err) {
        expect(err instanceof UnprocessableEntityError).toBeTruthy()
      }
    })
  })

  describe("get", () => {
    test("Can get a transaction when provided a valid id", async () => {
      const transaction = await Transaction.get(commonTransaction.id)

      for (let attr in commonTransaction) {
        expect(transaction[attr]).toEqual(commonTransaction[attr])
      }
    })

    test("Throws not found error when transaction doesn't exist", async () => {
      try {
        const transaction = await Transaction.get("doesnt exist")
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
    })
  })
})
