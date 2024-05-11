CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR,
  lastname VARCHAR,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);