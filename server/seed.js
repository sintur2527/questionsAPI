const csv = require('fast-csv');
const path = require('path');
const fs = require('fs');
const pgp = require('pg-promise')();

const config = {
  user: 'soumithinturi',
  host: 'localhost',
  database: 'questions',
  password: 'zxcv',
  port: 5432,
};

const db = pgp(config);

let totalCount = 0;

const fileStream = fs.createReadStream(
  '/Users/soumithinturi/Documents/hack-reactor-nyc23/hammer-questions/data/answers_photos.csv'
);

fileStream.pipe(csv.parse({ headers: true })).on('data', row => {
  let photo = JSON.stringify({ id: row.id, url: row[' url'] });
  return db
    .any('UPDATE answers SET photos = photos || $1::jsonb WHERE id = $2', [
      photo,
      row[' answer_id'],
    ])
    .then(count => {
      totalCount++;
      console.log('totalCount', totalCount);
    });
});
