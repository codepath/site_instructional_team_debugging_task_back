"use strict"

/** Routes for listings. */

const express = require("express")
const Listing = require("../models/listing")
const security = require("../middleware/security")
const { validateFields } = require("../utils/validate")
const router = new express.Router()

/**
 * POST / { listing } =>  { listing }
 *
 * listing should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns listing
 *
 * Authorization required: admin
 */

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  const requiredFields = ["description", "title", "location", "price", "currency"]
  validateFields({ required: requiredFields, obj: req.body, location: "create listing" })

  const user = res.locals.user

  const listing = await Listing.create({ ...req.body, owner: user.username })

  return res.status(201).json({ listing })
})

/**
 * GET / => { listings }
 *
 */
router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const listings = await Listing.fetchAll()
    return res.json({ listings })
  } catch (err) {
    return next(err)
  }
})

/**
 * GET /[listingId] => { listing }
 *
 */
router.get("/:listingId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const listing = await Listing.get(req.params.listingId)
    return res.json({ listing })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
