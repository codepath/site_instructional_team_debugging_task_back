"use strict"

const { nanoid } = require("nanoid")
const { storage } = require("../db/storage")
const User = require("./user")
const { NotFoundError, BadRequestError } = require("../utils/errors")

/** Related functions for listings. */

class Listing {
  static async _createPublicListing(rawListing) {
    const lineItems = [
      { item: "Listing price", amount: rawListing.price },
      {
        item: "Marketplace fees (10%)",
        amount: Math.ceil(rawListing.price * 0.1),
      },
    ]

    const totalAmount = lineItems.map((a) => a.amount).reduce((acc, cur) => acc + cur, 0)

    const listing = {
      ...rawListing,
      lineItems,
      totalAmount,
      host: await User.get(rawListing.owner),
    }

    return listing
  }

  /**
   * Create a listing (from data), update db, return new company data.
   *
   * Throws BadRequestError if listing already in database.
   * */

  static async create(newListing) {
    const { owner, description, title, location, image, price, currency } = newListing

    try {
      const existingListing = await storage.get("listings").find({ title, owner }).value()
      if (existingListing) {
        throw new BadRequestError("Listing with that title already exists.")
      }
    } catch (err) {
      throw new BadRequestError()
    }

    try {
      const listingObject = {
        id: nanoid(),
        owner: owner, // username
        description: description,
        title: title,
        location: location,
        image: image
          ? image
          : "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
        price: Number(price),
        currency,
      }

      storage.get("listings").push(listingObject).write()

      return await Listing.get(listingObject.id)
    } catch (err) {
      throw new BadRequestError()
    }
  }

  /**
   * Given a listing id, return data about that listing.
   *
   * Throws NotFoundError if not found.
   **/
  static async get(listingId) {
    const listing = storage.get("listings").find({ id: listingId }).value()

    if (listing) {
      return await Listing._createPublicListing(listing)
    }

    throw new NotFoundError("Listing not found with that id")
  }

  /**
   * Returns all listings
   *
   */
  static async fetchAll() {
    const listings = storage.get("listings").value()
    const publicListings = await Promise.all(listings.map(async (l) => await Listing._createPublicListing(l)))

    return publicListings
  }
}

module.exports = Listing
