DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(75),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  twilio_account_sid VARCHAR(255),
  twilio_authToken VARCHAR(255)
);

DROP TABLE IF EXISTS campaigns;
CREATE TABLE campaigns(
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  organization_name VARCHAR(255),
  phone_number VARCHAR(11) DEFAULT '14159148171',
  auto_response VARCHAR(1000),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS recipients;
CREATE TABLE recipients(
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(11),
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE
);
