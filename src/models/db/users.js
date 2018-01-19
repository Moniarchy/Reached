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

const addSid = (twilioAccountSID, id) => {
  return db.one(`
    UPDATE
      users
    SET
      twilio_account_sid = $1
    WHERE
      id = $2
    RETURNING
      *
  `,
  [
    twilioAccountSID,
    id
  ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getById = (id) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      id = $1
  `, id)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  create,
  addSid,
  getById
};
