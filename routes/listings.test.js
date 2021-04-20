"use strict"

const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  lebronToken,
  jloToken,
  adminToken,
} = require("../tests/routes/common")

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
  source: "https://unsplash.com/photos/AutCiGUz8D4",
  image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
  image2:
    "https://images.unsplash.com/photo-1567599672391-17b31d92e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
  image3:
    "https://images.unsplash.com/photo-1533044309907-0fa3413da946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  price: 23825,
  currency: "USD",
}

/************************************** POST /listings/ */

describe("POST /listings/", () => {
  test("Authed user can create new listing", async () => {
    const newListing = {
      location: "Canada",
      title: "Test",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      image:
        "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      price: 20000,
      currency: "USD",
    }

    const res = await request(app).post(`/listings/`).set("authorization", `Bearer ${lebronToken}`).send(newListing)
    expect(res.statusCode).toEqual(201)

    const { listing } = res.body

    const { description, title, location, image, price, currency } = listing

    expect({ description, title, location, image, price, currency }).toEqual(newListing)
    expect(listing.lineItems).toBeTruthy()
    expect(listing.totalAmount).toBeTruthy()
    expect(listing.host.email).toEqual("lebron@james.io")
  })

  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).post(`/listings/`)
    expect(res.statusCode).toEqual(401)
  })
})

/************************************** GET /listings/ */

describe("GET /listings/", () => {
  test("Authed user can get listings", async () => {
    const res = await request(app).get(`/listings/`).set("authorization", `Bearer ${jloToken}`)
    expect(res.statusCode).toEqual(200)

    const { listings } = res.body

    expect(listings.length).toEqual(13)

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
    }).toEqual(listing10)
  })

  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).get(`/listings/`)
    expect(res.statusCode).toEqual(401)
  })
})

/************************************** GET /listings/:listingId */

describe("GET /listings/:listingId", () => {
  test("Authenticated user can get listing by id", async () => {
    const listingId = 10
    const res = await request(app).get(`/listings/${listingId}/`).set("authorization", `Bearer ${jloToken}`)
    expect(res.statusCode).toEqual(200)

    const { listing } = res.body

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
    }).toEqual(listing10)
  })

  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const listingId = 10
    const res = await request(app).get(`/listings/${listingId}/`)
    expect(res.statusCode).toEqual(401)
  })
})
