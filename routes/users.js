"use strict"

/** Routes for users. */

const express = require("express")
const User = require("../models/user")
const security = require("../middleware/security")
const router = new express.Router()

/**
 * GET /me => { user }
 *
 * @returns { username, firstName, lastName, isAdmin, email }
 */
router.get("/me/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = await User.get(res.locals.user.username)
    return res.json({ user })
  } catch (err) {
    return next(err)
  }
})

/**
 * GET /[username] => { user }
 *
 * @returns { username, firstName, lastName, isAdmin, email }
 */
router.get("/:username/", security.requireMatchingUsernameOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username)
    return res.json({ user })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
