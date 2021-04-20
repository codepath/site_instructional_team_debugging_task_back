"use strict"

/** Shared config for application; can be required many places. */

require("dotenv").config()
require("colors")

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev"

const PORT = +process.env.PORT || 3001
const IS_TESTING = process.env.NODE_ENV === "test"

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test" ? "airbnb_test" : process.env.DATABASE_URL || "airbnb"
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13

console.log("AirBnB Clone Config:".green)
console.log("SECRET_KEY:".yellow, SECRET_KEY)
console.log("PORT:".yellow, PORT.toString())
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR)
console.log("Database:".yellow, getDatabaseUri())
console.log("---")

module.exports = {
  IS_TESTING,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}
