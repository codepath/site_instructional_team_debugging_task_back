const { storage } = require("../db/storage")

const createTransactions = async (users, listings) => {
  const user = users[2]
  const listing = listings[0]

  const transactions = [
    {
      id: "500",
      listingId: listing.id,
      bookingUsername: user.username,
      hostUsername: listing.owner,
      totalAmount: listing.price,
      currency: listing.currency,
      paymentMethod: `card`,
      startDate: "12-12-2021",
      endDate: "12-14-2021",
    },
    {
      id: "540",
      listingId: listing.id,
      bookingUsername: user.username,
      hostUsername: listing.owner,
      totalAmount: listing.price,
      currency: listing.currency,
      paymentMethod: `card`,
      startDate: "12-22-2021",
      endDate: "12-24-2021",
    },
  ]

  for (let transaction of transactions) {
    storage.get("transactions").push(transaction).write()
  }

  return transactions
}

module.exports = {
  createTransactions,
}
