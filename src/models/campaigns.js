const db = require('./db/campaigns');

const create = (userId, name, organizationName) => {
  return db.create(userId, name, organizationName);
};

const addAutoResponse = (id, userId, autoResponse) => {
  return db.addAutoResponse(id, userId, autoResponse);
};

const getById = id => {
  return db.getById(id);
};

const getByPhoneNumber = phoneNumber => {
  return db.getByPhoneNumber(phoneNumber);
};

const getByUserId = userId => {
  return db.getByUserId(userId)
}

module.exports = {
  create,
  addAutoResponse,
  getById,
  getByPhoneNumber,
  getByUserId
};
