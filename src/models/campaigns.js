const db = require('./db/campaigns');

const create = (userId, name, organizationName) => {
  return db.create(userId, name, organizationName);
};

const addAutoResponse = (id, userId, autoResponse) => {
  return db.addAutoResponse(id, userId, autoResponse);
};

const getById = function(Id) {
  return db.getById(Id);
};

module.exports = {
  create,
  addAutoResponse,
  getById
};
