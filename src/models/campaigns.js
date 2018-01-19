const db = require('./db/campaigns');

const create = (userId, name, organizationName) => {
  return db.create(userId, name, organizationName);
};

const addAutoResponse = (id, userId, autoResponse) => {
  return db.update(id, userId, autoResponse);
};

module.exports = {
  create,
  addAutoResponse
};
