"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const tokens = require("../utils/tokens")
const { validateFields } = require("../utils/validate")
const router = new express.Router()

/**
 * POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/token/", async function (req, res, next) {
  const { email, password } = req.body
  const requiredFields = ["email", "password"]
  validateFields({ required: requiredFields, obj: req.body, location: "login route" })

  const user = await User.authenticate({ email, password })
  const token = tokens.createUserJwt(user)
  return res.json({ token })
})

/**
 * POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/register/", async function (req, res, next) {
  const requiredFields = ["email", "password", "firstName", "lastName", "username"]
  validateFields({ required: requiredFields, obj: req.body, location: "registration route" })

  const user = await User.register({ ...req.body, isAdmin: false })
  const token = tokens.createUserJwt(user)
  return res.status(201).json({ token })
})

module.exports = router
