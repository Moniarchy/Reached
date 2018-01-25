const db = require("./db")

const create = (phoneNumber, campaignId) => {
  return db.one(`
    INSERT INTO recipients (phone_number, campaign_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [ phoneNumber, campaignId])
  .catch(error => {
    console.error(error.message)
    throw error
  })
}

const getAll = () => {
  return db.many(`
    SELECT * FROM recipients
  `)
  .catch(error => {
    console.error(error.message)
    throw error
  })
}

const getHellaInfoByCampaignId = campaignId => {
  return db.many(`
    SELECT recipients.phone_number AS recipientNumber, campaigns.phone_number AS campaignNumber, campaigns.name AS campaignName FROM recipients
    JOIN campaigns
    ON recipients.campaign_id = campaigns.id
    WHERE recipients.campaign_id = $1
  `, campaignId)
  .catch(error => {
    console.error(error.message)
    throw error
  })
}

module.exports = {
  create,
  getAll,
  getHellaInfoByCampaignId
}
