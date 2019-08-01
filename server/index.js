const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', router);

app.get('/', (req, res) => {
  res.send(`Server is hooked up to Docker`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
