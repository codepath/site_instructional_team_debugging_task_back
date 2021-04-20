"use strict"

const bcrypt = require("bcrypt")
const nanoid = require("nanoid")
const { storage } = require("../db/storage")
const { NotFoundError, BadRequestError, UnauthorizedError, UnprocessableEntityError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

/** Database interface for users. */

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's id or user's password
   *
   *
   * @param {User} user - user from database
   * @returns
   */
  static _createPublicUser(user) {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  /**
   * authenticate user with username, password.
   *
   * Throws UnauthorizedError is user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const userAccount = storage.get("users").find({ email }).value()

    if (userAccount && password) {
      const hashedPassword = userAccount.password

      const isPasswordMatch = await bcrypt.compare(password, hashedPassword)

      if (isPasswordMatch) return User._createPublicUser(userAccount)

      throw new UnauthorizedError("Invalid email/password combination.")
    }

    throw new UnauthorizedError("No user.")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, username, isAdmin } = creds
    const requiredCreds = ["email", "password", "firstName", "lastName", "username", "isAdmin"]
    validateFields({ required: requiredCreds, obj: creds, location: "user registration" })

    const existingUserWithEmail = storage.get("users").find({ email }).value()

    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }
    const existingUserWithUsername = storage.get("users").find({ username }).value()
    if (existingUserWithUsername) {
      throw new BadRequestError(`Duplicate username: ${username}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const userObject = {
      userId: nanoid.nanoid(),
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: normalizedEmail,
      password: hashedPassword,
      // avatar: gravatar.url(normalizedEmail, { s: "400" }),
      isAdmin,
    }

    storage.get("users").push(userObject).write()

    return await User._getById(userObject.userId)
  }

  /**
   * Given a username, return data about user.
   *
   * Throws NotFoundError if user not found.
   *
   * @returns { username, avatar, firstName, lastName, email, isAdmin }
   */
  static async get(username) {
    const user = storage.get("users").find({ username }).value()

    if (user) return User._createPublicUser(user)

    throw new NotFoundError("User not found")
  }

  /**
   * @private
   *
   * Given a userId, return data about user.
   *
   * Throws NotFoundError if user not found.
   *
   * @returns { username, avatar, firstName, lastName, email, isAdmin }
   */
  static async _getById(userId) {
    const user = storage.get("users").find({ userId }).value()

    if (user) return User._createPublicUser(user)

    throw new NotFoundError("User not found")
  }

  /**
   * Update user data with `data`.
   *
   * Throws NotFoundError if not found.
   *
   * @returns { username, email, firstName, lastName, isAdmin }
   */
  static async update(userId, data) {
    // code goes here
    storage.get("users").find({ userId }).assign(data).write()

    return await User._getById(userId)
  }
}

module.exports = User
