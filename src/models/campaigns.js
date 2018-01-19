const db = require('./db/campaigns');

const create = (userId, name, organizationName) => {
  return db.create(userId, name, organizationName);
};

module.exports = {
  create
};
