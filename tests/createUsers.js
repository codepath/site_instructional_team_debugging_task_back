const bcrypt = require("bcrypt")
const nanoid = require("nanoid")
// const gravatar = require("gravatar")
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens")
const { storage } = require("../db/storage")
const { BCRYPT_WORK_FACTOR } = require("../config")

const registerUserAndAdmin = async () => {
  const users = [
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

const createUsers = async () => {
  const registeredUsers = await registerUserAndAdmin()

  const lebron = {
    userId: nanoid.nanoid(),
    username: "lebron",
    firstName: "Lebron",
    lastName: "James",
    email: "lebron@james.io",
    password: await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    isAdmin: false,
    // avatar: gravatar.url("lebron@james.io", { s: "400" }),
  }

  storage.get("users").push(lebron).write()

  const serena = {
    userId: nanoid.nanoid(),
    username: "serena",
    firstName: "Serena",
    lastName: "Williams",
    email: "serena@williams.io",
    password: await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    isAdmin: true,
    // avatar: gravatar.url("serena@williams.io", { s: "400" }),
  }

  storage.get("users").push(serena).write()

  return [lebron, serena, ...registeredUsers]
}

const jloToken = createUserJwt({ email: "jennifer@lopez.io", username: "jlo", isAdmin: false })
const lebronToken = createUserJwt({ email: "lebron@james.io", username: "lebron", isAdmin: false })
const adminToken = createUserJwt({ email: "admin@admin.io", username: "admin", isAdmin: true })

module.exports = {
  createUsers,
  registerUserAndAdmin,
  jloToken,
  lebronToken,
  adminToken,
}
