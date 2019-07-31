DROP DATABASE IF EXISTS questions;
CREATE DATABASE questions;

\c questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL,
  asker_name VARCHAR (50) NOT NULL,
  asker_email VARCHAR (50) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER
);

COPY questions FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/questions.csv' DELIMITERS ',' CSV HEADER;

