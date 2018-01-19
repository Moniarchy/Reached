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

module.exports = {
  create
};
