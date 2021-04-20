"use strict"

const { storage } = require("../../db/storage")
const User = require("../../models/user")
const { createUserJwt } = require("../../utils/tokens")
const { createListings } = require("../createListings")

const createUsers = async () => {
  const users = [
    {
      username: "lebron",
      firstName: "Lebron",
      lastName: "James",
      email: "lebron@james.io",
      password: "password",
      isAdmin: false,
    },
    {
      username: "serena",
      firstName: "Serena",
      lastName: "Williams",
      email: "serena@williams.io",
      password: "password",
      isAdmin: false,
    },
    {
      username: "jlo",
      firstName: "Jennifer",
      lastName: "Lopez",
      email: "jennifer@lopez.io",
      password: "password",
      isAdmin: false,
    },
    {
      username: "admin",
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.io",
      password: "admin",
      isAdmin: true,
    },
  ]

  for (let user of users) {
    await User.register(user)
  }

  return users
}

async function commonBeforeAll() {
  storage.db.setState({ users: [], listings: [], transactions: [] })

  const users = await createUsers()

  await createListings(users)
}

async function commonBeforeEach() {
  // await db.query("BEGIN")
}

async function commonAfterEach() {
  // await db.query("ROLLBACK")
}

async function commonAfterAll() {
  // await db.end()
}

const jloToken = createUserJwt({ email: "jennifer@lopez.io", username: "jlo", isAdmin: false })
const lebronToken = createUserJwt({ email: "lebron@james.io", username: "lebron", isAdmin: false })
const adminToken = createUserJwt({ email: "admin@admin.io", username: "admin", isAdmin: true })

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  lebronToken,
  jloToken,
  adminToken,
}
