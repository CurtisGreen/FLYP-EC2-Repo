const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const sql_funcs   = require ('./create_table.js');

// Connect to DB
const connection = mysql.createConnection({
	host     : 'localhost',
	user	 : 'root',
	database : 'Capstone'
});

connection.connect( function(err){
	if (err) throw err;
	console.log("Connected to DB");

	// All of these worked:
	//create_attendance_table("test");
	//add_date_column("2018_10_27", "test");
	//add_student("333003333", "Curtis", "Green", "123456789");
	//add_professor("444004444", "Curtis", "Green", "123456789");

});

// Initialize the app/router
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
let port = 8080;
let router = express.Router();

// General API
router.get('/', function(req, res) {
	res.json({message: "API works"});
});

// Add new class
router.route('/class')
	.post(function(req, res) {
		create_attendance_table(req.body.name);
		res.json({message: 'Success'});
	});

// Add new attendance day to class
router.route('/class/:class_id')
	.put(function(req, res) {
		add_date_column(req.body.date, req.params.class_id);
		res.json({message: 'Success'});
	});

// Add new student
router.route('/student')
	.post(function(req, res) {
		add_student(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	});

// Add new professor
router.route('/professor')
	.post(function(req, res) {
		add_professor(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	});

// Start server
app.use('/api', router);
app.listen(port);
console.log('Running on ' + port);

// SQL functions
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