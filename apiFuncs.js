const mysql = require('mysql');

// Get SQL queries
const sql_queries = require ('./queries.js');

// Connect to DB
const sql_conn = mysql.createConnection({
	host     : 'localhost',
	user	 : 'root',
	database : 'Capstone'
});

// Runs on sql connection
sql_conn.connect( function(err){
	if (err) throw err;
	console.log("Connected to DB");

	/*
	// Test params
	let stud_uin = 888008888;
	let prof_uin = 999009999;
	let course_name = "CSCE_121_500";
	let date = "2018_11_05";

	// Tests for functions
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
	setTimeout( get_num_class_days.bind(null, course_name), 1000);
	*/

});

// Add new student
function add_student(uin, first_name, last_name, card){

	sql_queries.add_student(uin, first_name, last_name, card).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " added");
			//console.log(results);
		});
	});

}

// Add new professor
function add_professor(uin, first_name, last_name, card){

	sql_queries.add_professor(uin, first_name, last_name, card).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nProfessor " + uin + " added");
			//console.log(results);
		});
	});

}

// Assign professor to course
function insert_course(course_id, professor_uin){

	sql_queries.insert_course(course_id, professor_uin).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nCourse " + course_id + " assigned to " + professor_uin);
			//console.log(results);
		});
	});

}

// Creates attendance roster for a class
function create_attendance_table(class_name){

	sql_queries.create_attendance_table(class_name).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nAttendance table " + class_name + " created");
			//console.log(results);
		});
	});

}

// Add student to course roster
function populate_course(course_id, student_uin){

	sql_queries.populate_course(course_id, student_uin).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("Student " + student_uin + " added to " + course_id);
			//console.log(results);
		});
	});

}

// Add new attendance day column to the table
function add_date_column(date, table_name){

	sql_queries.add_date_column(date, table_name).then(query => {
		sql_conn.query(query, function(error, results, fields){
			if (error) throw error;
			console.log("\nDate column " + date + " added for " + table_name);
			//console.log(results);
		});
	});

}

// Set a student as present
function update_attendance(uin, course_name, date){

	sql_queries.update_attendance(uin, course_name, date).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " has attended " + course_name + " on " + date);
			//console.log(results);
		});
	});

}

// Add 1 to days attended
function inc_days_attended(uin, course_name){

	sql_queries.inc_days_attended(uin, course_name).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nStudent " + uin + " attendance for " + course_name + " increased");
			//console.log(results);
		});
	});
	
}

// Add 1 to number of course days
function inc_course_days(course_name){

	sql_queries.inc_course_days(course_name).then(query => {
		sql_conn.query(query, function (error, results, fields){
			if (error) throw error;
			console.log("\nCourse " + course_name + " days increased");
			//console.log(results);
		});
	});
	
}

// Get number of classes attended
let get_num_attended = (uin, course_name) =>{
	return new Promise ((resolve, reject) => {
		sql_queries.get_num_attended(uin, course_name).then(query => {
			sql_conn.query(query, function (error, results, fields){
				if (error) throw error;
				console.log("\nStudent " + uin + " attended " + course_name + " for " + results[0].classes_attended + " days");
				resolve(results[0].classes_attended);
			});
		});
	});
	
}

// Get number of class days held
let  get_num_class_days = (course_name) => {
	return new Promise ((resolve, reject) => {
		sql_queries.get_num_class_days(course_name).then(query => {
			sql_conn.query(query, function (error, results, fields){
				if (error) throw error;
				console.log("\nCourse " + course_name + " held for " + results[0].num_held + " days");
				resolve(results[0].num_held);
			});
		});
	});
	
}

module.exports = {
	add_student, add_professor, insert_course, create_attendance_table,
	populate_course, add_date_column, update_attendance, inc_days_attended,
	inc_course_days, get_num_attended, get_num_class_days
};