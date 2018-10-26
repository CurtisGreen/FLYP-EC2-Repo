const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const sqlFuncs   = require ('./create_table.js');

const connection = mysql.createConnection({
	host     : 'localhost',
	user	 : 'root',
	database : 'Capstone'
});

// Initialize the app
const app = express();

connection.connect( function(err){
	if (err) throw err;
	console.log("Connected to DB");

	//let newQuery = sqlFuncs.gen_Create_Table("testClass");
	connection.query("CREATE TABLE IF NOT EXISTS testClass ( uin char(9),  FOREIGN KEY (uin) REFERENCES Capstone.students(uin) );", function(error, results, fields){
		if (error) throw error;
		console.log("guess it worked");
	})
});

app.get('/posts', function (req, res) {
	console.log("it recognizes posts");
    connection.connect( function(err){
    	if (err) throw err;
    	console.log("Connected to DB");
    });

    connection.query('SELECT * FROM posts LIMIT 0, 10', function (error, results, fields) {
      if (error) throw error;
      console.log("guess it worked");
      res.send(results)
    });

    connection.end();
});
// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/posts to see posts');
});