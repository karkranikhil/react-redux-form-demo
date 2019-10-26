const express = require('express');
const bodyParser = require('body-parser');
const mockdata = require('./mockData')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/reference_data', (req, res) => {
  res.send(mockdata);
});

app.post('/v1/customer', (req, res) => {
  console.log(req.body);
  let response = JSON.stringify(req.body)
  res.send(
    {
      response: `${response}`
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));