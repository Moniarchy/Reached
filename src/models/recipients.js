const db = require('./db/recipients')

const create = (phoneNumber, campaignId) => {
  return db.create(phoneNumber, campaignId)
}

const getAll = () => {
  return db.getAll()
}

const getHellaInfoByCampaignId = (campaignId) => {
  return db.getHellaInfoByCampaignId(campaignId)
}

module.exports = {
  create,
  getAll,
  getHellaInfoByCampaignId
 }
