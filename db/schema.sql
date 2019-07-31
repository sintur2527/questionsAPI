DROP DATABASE IF EXISTS questions;
CREATE DATABASE questions;

\c questions;

CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  product_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL,
  asker_name VARCHAR (50) NOT NULL,
  asker_email VARCHAR (100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER
);

COPY questions FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/questions.csv' DELIMITERS ',' CSV HEADER;

CREATE TABLE answers (
  id INTEGER PRIMARY KEY NOT NULL,
  question_id INTEGER , 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL,
  answerer_name VARCHAR (50) NOT NULL,
  answerer_email VARCHAR (100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER  
);

COPY answers FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers.csv' DELIMITERS ',' CSV HEADER;

CREATE TABLE photos (
  id INTEGER NOT NULL,
  answer_id INTEGER,
  url VARCHAR,
  PRIMARY KEY (id, answer_id)
);

COPY photos FROM '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;