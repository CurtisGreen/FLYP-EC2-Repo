const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  database : 'Capstone'
});

// Initialize the app
const app = express();

app.get('/posts', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM posts LIMIT 0, 10', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

    connection.end();
});
// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/posts to see posts');
});