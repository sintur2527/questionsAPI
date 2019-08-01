
DROP TABLE IF EXISTS questions;
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

DROP TABLE IF EXISTS photos;
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

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id INTEGER NOT NULL,
  answer_id INTEGER,
  url VARCHAR,
  PRIMARY KEY (id, answer_id)
);

\copy questions FROM './docker-entrypoint-initdb.d/csv/questions.csv' DELIMITERS ',' CSV HEADER;

\copy answers FROM './docker-entrypoint-initdb.d/csv/answers.csv' DELIMITERS ',' CSV HEADER;

\copy photos FROM './docker-entrypoint-initdb.d/csv/answers_photos.csv' DELIMITERS ',' CSV HEADER;