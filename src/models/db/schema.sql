DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(75),
  email VARCHAR(100),
  password VARCHAR(255),
  twilio_account_sid VARCHAR(255),
  twilio_authToken VARCHAR(255)
);

DROP TABLE IF EXISTS campaigns;
CREATE TABLE campaigns(
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  organization_name VARCHAR(255),
  phone_number INTEGER,
  auto_response VARCHAR(1000),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
