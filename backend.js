const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const sql_funcs   = require ('./create_table.js');

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

	// All of these worked:
	//create_attendance_table("test");
	//add_date_column("2018_10_27", "test");
	//add_student("333003333", "Curtis", "Green", "123456789");
	//add_professor("444004444", "Curtis", "Green", "123456789");

});

function create_attendance_table(tableName){

	sql_funcs.gen_create_table(tableName).then(query => {
		connection.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Attendance table " + tableName + " created");
		});
	});

}

function add_date_column(date, table_name){

	sql_funcs.add_date_column(date, table_name).then(query => {
		connection.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Date column " + date + " added for " + table_name);
		});
	});

}

function add_student(uin, first_name, last_name, card){

	sql_funcs.add_student(uin, first_name, last_name, card).then(query => {
		connection.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Student " + uin + " added");
		});
	});

}

function add_professor(uin, first_name, last_name, card){

	sql_funcs.add_professor(uin, first_name, last_name, card).then(query => {
		connection.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Student " + uin + " added");
		});
	});

}