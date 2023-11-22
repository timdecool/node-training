// get the client
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000);

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dwwm_231020',
});

const displayResults = (req, res) => {
  const limit = isNaN(req.query.limit) ? 10:parseInt(req.query.limit);
  const page = isNaN(req.query.page) ? 1:parseInt(req.query.page);

  connection.query(
    `SELECT * FROM images ORDER BY id DESC LIMIT ${limit} OFFSET ${(page-1)*limit}`,
    function(err, results, fields) {
      res.send(results);
      console.log(err);
    }
  );
}

app.use('/',express.static('public'))
app.get('/api', displayResults);
app.post('/api', (req, res) => {
  console.log(req.body)
});