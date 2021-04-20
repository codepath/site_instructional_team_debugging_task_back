const { createUsers, jloToken, lebronToken, adminToken } = require("../createUsers")
const { createListings } = require("../createListings")
const { storage } = require("../../db/storage")

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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  jloToken,
  lebronToken,
  adminToken,
}
