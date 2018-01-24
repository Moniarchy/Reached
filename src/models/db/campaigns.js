const db = require("./db");

const create = (userId, name, organizationName) => {
  return db.oneOrNone(`
    INSERT INTO
      campaigns (user_id, name, organization_name)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `,
    [
      userId,
      name,
      organizationName
    ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const addAutoResponse = (id, userId, autoResponse) => {
  return db.none(`
    UPDATE campaigns
    SET user_id=$2, auto_response=$3
    WHERE id=$1
    `,
    [id, userId, autoResponse])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getById = id => {
  return db.one(`
    SELECT * FROM campaigns
    WHERE id = $1
    `, id)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getByPhoneNumber = phoneNumber => {
  return db.one(`
    SELECT * FROM campaigns
    WHERE phone_number = $1
    `, phoneNumber)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getByUserId = userId => {
  return db.one(`
    SELECT * FROM campaigns
    WHERE user_id = $1
    `, userId)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  create,
  addAutoResponse,
  getById,
  getByPhoneNumber,
  getByUserId
};
