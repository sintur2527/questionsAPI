DROP DATABASE IF EXISTS questions;
CREATE DATABASE questions;

\c questions

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR (50) NOT NULL,
  asker_email VARCHAR (100) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpful INTEGER
);

SELECT setval('questions_questions_id_seq', SELECT count(*) FROM questions, true);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR (50) NOT NULL,
  answerer_email VARCHAR (100) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpful INTEGER 
);

SELECT setval('answers_answers_id_seq', SELECT count(*) FROM answers, true);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  url VARCHAR
);

SELECT setval('photos_photos_id_seq', SELECT count(*) FROM photos, true);

\copy questions FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/questions.csv' DELIMITERS ',' CSV HEADER;

\copy answers FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers.csv' DELIMITERS ',' CSV HEADER;

\copy photos FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

CREATE INDEX question_id_idx ON answers (question_id);
CREATE INDEX answer_id_idx ON photos (answer_id);

ALTER TABLE answers ADD COLUMN photos jsonb[] DEFAULT '{}'::jsonb[];

-- COPY answers TO '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers2.csv' DELIMITER ',' CSV HEADER;