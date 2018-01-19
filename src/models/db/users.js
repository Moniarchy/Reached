const db = require("./db");

const create = (firstName, lastName, email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (first_name, last_name, email, password)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      *
    `,
    [
      firstName,
      lastName,
      email,
      password
    ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  create
};
