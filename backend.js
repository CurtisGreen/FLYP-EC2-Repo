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

	createAttendanceTable("test");
	
});

function createAttendanceTable(tableName){

	sqlFuncs.gen_Create_Table(tableName).then(query => {
		connection.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Attendance table " + tableName + "created");
		});
	});

}