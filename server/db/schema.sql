DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL,
  asker_name VARCHAR (50) NOT NULL,
  asker_email VARCHAR (100) NOT NULL,
  reported INTEGER,
  helpful INTEGER
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id INTEGER PRIMARY KEY NOT NULL,
  question_id INTEGER, 
  body VARCHAR NOT NULL,
  date_written TIMESTAMP NOT NULL,
  answerer_name VARCHAR (50) NOT NULL,
  answerer_email VARCHAR (100) NOT NULL,
  reported INTEGER,
  helpful INTEGER 
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY NOT NULL,
  answer_id INTEGER,
  url VARCHAR
);

\copy questions FROM './docker-entrypoint-initdb.d/csv/questions.csv' DELIMITERS ',' CSV HEADER;

\copy answers FROM './docker-entrypoint-initdb.d/csv/answers.csv' DELIMITERS ',' CSV HEADER;

\copy photos FROM './docker-entrypoint-initdb.d/csv/answers_photos.csv' DELIMITERS ',' CSV HEADER;

CREATE INDEX question_id_idx ON answers (question_id);
CREATE INDEX answer_id_idx ON photos (answer_id);