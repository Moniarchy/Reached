const db = require('./db/recipients')

const create = (phoneNumber, campaignId) => {
  return db.create(phoneNumber, campaignId)
}

const getAll = () => {
  return db.getAll()
}

module.exports = {
  create,
  getAll
 }
