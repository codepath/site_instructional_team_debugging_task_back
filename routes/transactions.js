"use strict"

/** Routes for listings. */

const express = require("express")
const Transaction = require("../models/transaction")
const security = require("../middleware/security")
const listingPermissions = require("../middleware/permissions/listings")
const transactionPermissions = require("../middleware/permissions/transactions")
const router = new express.Router()

/**
 * POST /listings/[listingId] { listingId } =>  { transaction }
 *
 *
 */
router.post(
  "/listing/:listingId/",
  security.requireAuthenticatedUser,
  listingPermissions.authedUserIsNotListingOwner,
  async (req, res, next) => {
    const { user, listing } = res.locals
    const { startDate, endDate } = req.body

    const transaction = await Transaction.create({ user, listing, startDate, endDate })

    return res.status(201).json({ transaction })
  }
)

/**
 * GET /listings/[listingId] { listingId } =>  { transaction }
 *
 *
 */
router.get(
  "/listing/:listingId/",
  security.requireAuthenticatedUser,
  listingPermissions.authedUserOwnsListing,
  async (req, res, next) => {
    try {
      const { listing } = res.locals

      const transaction = await Transaction.getTransactionsForListing(listing.id)

      return res.status(200).json({ transaction })
    } catch (err) {
      return next(err)
    }
  }
)

/**
 * GET /[username] => { transactions }
 *
 * Fetch all transactions for the currently authenticated user
 *
 */
router.get("/me/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const transactions = await Transaction.getTransactionsForUser(user.username)

    return res.status(200).json({ transactions })
  } catch (err) {
    return next(err)
  }
})

/**
 * GET /[transactionId] => { transaction }
 *
 * Fetch a single transaction for the currently authenticated user
 *
 *
 */
router.get(
  "/:transactionId",
  security.requireAuthenticatedUser,
  transactionPermissions.authedUserIsHostOrBookingUserForTransaction,
  async (req, res, next) => {
    try {
      const { transaction } = res.locals

      return res.status(200).json({ transaction })
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
