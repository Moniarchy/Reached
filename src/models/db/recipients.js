const db = require("./db")

const create = (phoneNumber, campaignId) => {
  return db.one(`
    INSERT INTO recipients (phone_number, campaign_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [ phoneNumber, campaignId])
  .then(recipient => {
    return db.one(`
      SELECT * FROM campaigns
      JOIN recipients
      ON campaigns.id = recipients.campaign_id
      WHERE recipient.campaign_id = $1
    `, [recipient.campaign_id])
  })
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

module.exports = {
  create,
  getAll
}
