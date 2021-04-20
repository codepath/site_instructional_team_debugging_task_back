"use strict"

const { nanoid } = require("nanoid")
const { storage } = require("../db/storage")
const User = require("./user")
const Listing = require("./listing")
const { NotFoundError, BadRequestError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

/** Related functions for listings. */

class Transaction {
  static async _createPublicTransaction(transaction) {
    return {
      ...transaction,
      bookingUser: await User.get(transaction.bookingUsername),
      hostUser: await User.get(transaction.hostUsername),
    }
  }

  static async create(newTransaction) {
    const { user, listing, startDate, endDate, guests } = newTransaction
    const requiredCreds = ["user", "listing", "startDate", "endDate"]
    validateFields({ required: requiredCreds, obj: newTransaction, location: "transaction create" })

    const transaction = {
      id: nanoid(),
      listingId: listing.id,
      bookingUsername: user.username,
      hostUsername: listing.owner,
      totalAmount: listing.totalAmount,
      currency: listing.currency,
      paymentMethod: `card`,
      startDate,
      endDate,
      guests: guests || 1,
    }

    storage.db.get("transactions").push(transaction).write()

    return await Transaction.get(transaction.id)
  }

  static async get(transactionId) {
    const transaction = storage.db.get("transactions").find({ id: transactionId }).value()

    if (!transaction) {
      throw new NotFoundError("Transaction Not Found")
    }

    return await Transaction._createPublicTransaction(transaction)
  }

  static async getTransactionsForListing(listingId) {
    const transactions = storage.db.get("transactions").filter({ listingId }).value()

    return await Promise.all(transactions.map(async (t) => await Transaction._createPublicTransaction(t)))
  }

  static async getTransactionsForUser(username) {
    // all the transactions they've booked
    const bookedTransactions = storage.db.get("transactions").filter({ bookingUsername: username }).value()
    // and for listings they own
    const hostedTransactions = storage.db.get("transactions").filter({ hostUsername: username }).value()

    return {
      bookedTransactions: await Promise.all(
        bookedTransactions.map(async (t) => await Transaction._createPublicTransaction(t))
      ),
      hostedTransactions: await Promise.all(
        hostedTransactions.map(async (t) => await Transaction._createPublicTransaction(t))
      ),
    }
  }
}

module.exports = Transaction
