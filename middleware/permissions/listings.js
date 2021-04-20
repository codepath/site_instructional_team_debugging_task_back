const Listing = require("../../models/listing")
const { BadRequestError, ForbiddenError } = require("../../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the listing.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the listing to res.locals
 *
 */
const authedUserOwnsListing = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { listingId } = req.params
    const listing = await Listing.get(listingId)

    if (listing.owner !== user.username) {
      throw new ForbiddenError("User is not allowed to fetch transactions for other users' listings.")
    }

    res.locals.listing = listing

    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Checks to make sure that the authenticated user is not the owner of the listing.
 * If they are, throws a BadRequest Error.
 * Otherwise, attaches the listing to res.locals
 *
 */
const authedUserIsNotListingOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { listingId } = req.params
    const listing = await Listing.get(listingId)

    if (listing.owner === user.username) {
      throw new BadRequestError("User is not allowed to make reservatons for their own listing.")
    }

    res.locals.listing = listing

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserOwnsListing,
  authedUserIsNotListingOwner,
}
