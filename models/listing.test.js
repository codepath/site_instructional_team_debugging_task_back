"use strict"

const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")
const User = require("./user")
const Listing = require("./listing")
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/models/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("Listing", () => {
  /************************************** new listing */
  describe("create", () => {
    test("Can create new listing successfully with valid params", async () => {
      const user = await User.authenticate({ email: "lebron@james.io", password: "password" })

      const newListing = {
        owner: user.username,
        location: "Canada",
        title: "Test",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
        image:
          "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        price: 20000,
        currency: "USD",
      }

      const listing = await Listing.create(newListing)

      const { owner, description, title, location, image, price, currency } = listing

      expect({ owner, description, title, location, image, price, currency }).toEqual(newListing)
      expect(listing.lineItems).toBeTruthy()
      expect(listing.totalAmount).toBeTruthy()
      expect(listing.host.email).toBeTruthy()
    })

    test("Throws an error when a listing already exists", async () => {
      expect.assertions(1)

      const user = await User.authenticate({ email: "lebron@james.io", password: "password" })

      const newListing = {
        owner: user.username,
        location: "Canada",
        title: "Test2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
        image:
          "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        price: 20000,
        currency: "USD",
      }

      await Listing.create(newListing)

      try {
        await Listing.create(newListing)
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  })

  /************************************** fetch all listings */
  describe("fetchAll", () => {
    test("Can successfully fetch all listings", async () => {
      const listings = await Listing.fetchAll()
      expect(listings.length).toEqual(14)

      const listing10 = listings.filter((l) => l.id === "10")[0]

      const { id, owner, location, title, description, source, image, image2, image3, price, currency } = listing10

      expect({
        id,
        owner,
        location,
        title,
        description,
        source,
        image,
        image2,
        image3,
        price,
        currency,
      }).toEqual({
        id: "10",
        owner: "lebron",
        location: "France",
        title: "Modern home on the French Riviera",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
        source: "https://unsplash.com/photos/AutCiGUz8D4",
        image:
          "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
        image2:
          "https://images.unsplash.com/photo-1567599672391-17b31d92e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        image3:
          "https://images.unsplash.com/photo-1533044309907-0fa3413da946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        price: 23825,
        currency: "USD",
      })
    })
  })

  /************************************** fetch single listing */
  describe("get", () => {
    test("Can fetch listing by id", async () => {
      const listing = await Listing.get("10")

      const { id, owner, location, title, description, source, image, image2, image3, price, currency } = listing

      expect({
        id,
        owner,
        location,
        title,
        description,
        source,
        image,
        image2,
        image3,
        price,
        currency,
      }).toEqual({
        id: "10",
        owner: "lebron",
        location: "France",
        title: "Modern home on the French Riviera",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
        source: "https://unsplash.com/photos/AutCiGUz8D4",
        image:
          "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
        image2:
          "https://images.unsplash.com/photo-1567599672391-17b31d92e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        image3:
          "https://images.unsplash.com/photo-1533044309907-0fa3413da946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        price: 23825,
        currency: "USD",
      })
    })

    test("Throws NotFound error when id doesn't exist.", async () => {
      expect.assertions(1)

      try {
        const listing = await Listing.get("doesn't exist")
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
    })
  })
})
