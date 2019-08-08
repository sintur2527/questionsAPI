DROP DATABASE IF EXISTS questions;
CREATE DATABASE questions;

\c questions

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR (50) NOT NULL,
  asker_email VARCHAR (100) NOT NULL,
  reported INTEGER DEFAULT 0,
  helpful INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR (50) NOT NULL,
  answerer_email VARCHAR (100) NOT NULL,
  reported INTEGER DEFAULT 0,
  helpful INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  url VARCHAR
);

\copy questions FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/server/data/questions.csv' DELIMITERS ',' CSV HEADER;

\copy answers FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/server/data/answers.csv' DELIMITERS ',' CSV HEADER;

\copy photos FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/server/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

ALTER TABLE answers ADD COLUMN photos jsonb[] DEFAULT '{}'::jsonb[];

-- COPY answers TO '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/server/data/seeded_answers.csv' DELIMITER ',' CSV HEADER;