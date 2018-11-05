const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const sql_funcs   = require ('./create_table.js');

// Connect to DB
const sql_conn = mysql.createConnection({
	host     : 'localhost',
	user	 : 'root',
	database : 'Capstone'
});

sql_conn.connect( function(err){
	if (err) throw err;
	console.log("Connected to DB");

	// Test params
	let stud_uin = 888008888;
	let prof_uin = 999009999;
	let course_name = "CSCE_121_500";
	let date = "2018_11_05";

	add_student(stud_uin, "stud_first", "stud_last", "123");
	setTimeout( add_professor.bind(null, prof_uin, "prof_first", "prof_last", "123"), 100);
	setTimeout( insert_course.bind(null, course_name, prof_uin), 200);
	setTimeout( create_attendance_table.bind(null, course_name), 300);
	setTimeout( populate_course.bind(null, course_name, stud_uin), 400);
	setTimeout( add_date_column.bind(null, date, course_name), 500);
	setTimeout( update_attendance.bind(null, stud_uin, course_name, date), 600);
	setTimeout( inc_days_attended.bind(null, stud_uin, course_name), 700);
	setTimeout( inc_course_days.bind(null, course_name), 800);
	setTimeout( get_num_attended.bind(null, stud_uin, course_name), 900);

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

// Add new student
function add_student(uin, first_name, last_name, card){

	sql_funcs.add_student(uin, first_name, last_name, card).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " added");
			//console.log(results);
		});
	});

}

// Add new professor
function add_professor(uin, first_name, last_name, card){

	sql_funcs.add_professor(uin, first_name, last_name, card).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nProfessor " + uin + " added");
			//console.log(results);
		});
	});

}

// Assign professor to course
function insert_course(course_id, professor_uin){

	sql_funcs.insert_course(course_id, professor_uin).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nCourse " + course_id + " assigned to " + professor_uin);
			//console.log(results);
		});
	});

}

// Creates attendance roster for a class
function create_attendance_table(class_name){

	sql_funcs.create_attendance_table(class_name).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nAttendance table " + class_name + " created");
			//console.log(results);
		});
	});

}

// Add student to course roster
function populate_course(course_id, student_uin){

	sql_funcs.populate_course(course_id, student_uin).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Student " + student_uin + " added to " + course_id);
			//console.log(results);
		});
	});

}

// Add new attendance day column to the table
function add_date_column(date, table_name){

	sql_funcs.add_date_column(date, table_name).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nDate column " + date + " added for " + table_name);
			//console.log(results);
		});
	});

}

// Set a student as present
function update_attendance(uin, course_name, date){

	sql_funcs.update_attendance(uin, course_name, date).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " has attended " + course_name + " on " + date);
			//console.log(results);
		});
	});

}

// Add 1 to days attended
function inc_days_attended(uin, course_name){

	sql_funcs.inc_days_attended(uin, course_name).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " attendance for " + course_name + " increased");
			//console.log(results);
		});
	});
	
}

// Add 1 to number of course days
function inc_course_days(course_name){

	sql_funcs.inc_course_days(course_name).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nCourse " + course_name + " days increased");
			//console.log(results);
		});
	});
	
}
// Get number of classes attended
function get_num_attended(uin, course_name){

	sql_funcs.get_num_attended(uin, course_name).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " num days retrieved for course " + course_name);
			console.log("Number of days: " + results[0].classes_attended);
		});
	});
	
}