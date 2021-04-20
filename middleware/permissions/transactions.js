const Transaction = require("../../models/listing")
const { ForbiddenError } = require("../../utils/errors")

/**
 * Checks to make sure that the authenticated user is the host or booking user for the transactiom.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the transaction to res.locals
 *
 */
const authedUserIsHostOrBookingUserForTransaction = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { transactionId } = req.params
    const transaction = await Transaction.get(transactionId)

    if (![transaction?.hostUsername, transaction?.bookingUsername].includes(user?.username)) {
      throw new ForbiddenError("User is not allowed to fetch transactions for other users' listings.")
    }

    res.locals.transaction = transaction

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserIsHostOrBookingUserForTransaction,
}
