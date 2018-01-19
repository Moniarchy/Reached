const db = require('./db/users');
const { encryptPassword, comparePasswords } = require('../utils');

const create = (firstName, lastName, email, password) => {
  return encryptPassword(password)
  .then(hashedPassword => {
    return db.create(firstName, lastName, email, hashedPassword);
  });
};

module.exports = {
  create
};
