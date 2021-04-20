"use strict"
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../../tests/permissions/common")
const { BadRequestError, ForbiddenError } = require("../../utils/errors")
const listingPermissions = require("./listings")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

const listing10 = {
  id: "10",
  owner: "lebron",
  location: "France",
  title: "Modern home on the French Riviera",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
  price: 23825,
  currency: "USD",
}

describe("ListingPermissions", () => {
  describe("authedUserOwnsListing", () => {
    test("Attaches listing to res.local if authed user is listing owner", async () => {
      expect.assertions(3)

      const req = { params: { listingId: "10" } }
      const res = { locals: { user: { username: "lebron" } } }
      const next = (err) => expect(err).toBeFalsy()
      await listingPermissions.authedUserOwnsListing(req, res, next)

      const { listing } = res.locals
      expect(listing).toBeTruthy()
      const { id, owner, description, title, location, image, price, currency } = listing

      expect({ id, owner, description, title, location, image, price, currency }).toEqual(listing10)
    })

    test("Throws error if authed user doesn't own listing", async () => {
      expect.assertions(2)

      const req = { params: { listingId: "10" } }
      const res = { locals: { user: { username: "jlo" } } }
      const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
      await listingPermissions.authedUserOwnsListing(req, res, next)

      const { listing } = res.locals
      expect(listing).toBeFalsy()
    })
  })

  describe("authedUserIsNotListingOwner", () => {
    test("Attaches listing to res.local if authed user does not own listing", async () => {
      expect.assertions(3)

      const req = { params: { listingId: "10" } }
      const res = { locals: { user: { username: "jlo" } } }
      const next = (err) => expect(err).toBeFalsy()
      await listingPermissions.authedUserIsNotListingOwner(req, res, next)

      const { listing } = res.locals
      expect(listing).toBeTruthy()
      const { id, owner, description, title, location, image, price, currency } = listing

      expect({ id, owner, description, title, location, image, price, currency }).toEqual(listing10)
    })

    test("Throws error if authed user does own listing", async () => {
      expect.assertions(2)

      const req = { params: { listingId: "10" } }
      const res = { locals: { user: { username: "lebron" } } }
      const next = (err) => expect(err instanceof BadRequestError).toBeTruthy()
      await listingPermissions.authedUserIsNotListingOwner(req, res, next)

      const { listing } = res.locals
      expect(listing).toBeFalsy()
    })
  })
})
