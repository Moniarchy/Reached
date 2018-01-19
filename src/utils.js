const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePasswords = (passwordEntered, hashedPassword) => {
  return bcrypt.compare(passwordEntered, hashedPassword);
};

module.exports = {
  encryptPassword,
  comparePasswords
};
