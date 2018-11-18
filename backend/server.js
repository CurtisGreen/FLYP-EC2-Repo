const express = require('express');
const bodyParser = require('body-parser');
const api_funcs = require('./apiFuncs');

// Initialize the app/router
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	next();
})
let port = 3001;
let router = express.Router();

// General API for testing
router.route('/')
	.get(function(req, res) {
		res.json({message: "API works"});
	})
	.post(function(req, res) {
		console.log(req.body);
		res.json({message: "API works"});
	})
	.put(function(req, res) {
		console.log(req.body);
		res.json({message: "API works"});
	});

// Add new class
router.route('/class')
	.post(function(req, res) {
		api_funcs.create_attendance_table(req.body.course_name);
		api_funcs.insert_course(req.body.course_name, req.body.uin);
		res.json({message: 'Success'});
	});

// Add new attendance day to class
router.route('/class/:course_name')
	.put(function(req, res) {
		api_funcs.add_date_column(req.body.date, req.params.course_name);
		res.json({message: 'Success'});
	});

router.route('/student')
	// Add new student
	.post(function(req, res) {
		api_funcs.add_student(req.body.uin, req.body.first, req.body.last);
		res.json({message: 'Success'});
	})

	// Add student to class
	.put(function(req, res) {
		api_funcs.populate_course(req.body.course_name, req.body.uin);
		res.json({message: 'Success'});
	});

router.route('/professor')
	// Add new professor
	.post(function(req, res) {
		api_funcs.add_professor(req.body.uin, req.body.first, req.body.last);
		
	})

	// Get list of professors
	.get(function(req, res) {
		api_funcs.get_professors().then(professors => {
			res.json({professors: professors})
		});
	});

// Get list of courses
router.route('/professor/:uin/courses')
	.get(function(req, res) {
		api_funcs.get_courses(req.params.uin).then(data => {
			res.json({data:data});
		});
	});

// Check if prof exists T/F
router.route('/professor/:uin/exists')
	.get(function(req, res) {
		api_funcs.check_professor_exists(req.params.uin).then(data => {
			console.log("\nChecked if professor " + req.params.uin + " exists");
			res.json({data:data});
		});
	});

// Set a student's attendance and return num attended
router.route('/attendance')
	.put(function(req, res) {
		api_funcs.update_attendance(req.body.uin, req.body.course_name, req.body.date);
		api_funcs.inc_days_attended(req.body.uin, req.body.course_name);
		api_funcs.get_num_attended(req.body.uin, req.body.course_name).then(num_att => {
			api_funcs.get_num_class_days(req.body.course_name).then(num_days => {
				res.json({num_attended: num_att, num_class_days: num_days});
			});
		});
	})

// Get attendance table
router.route('/attendance/:course_name')
	.get(function(req, res) {
		api_funcs.get_attendance(req.params.course_name).then(data => {
			res.json({data: data});
		})
	})

// Gets roster for a course
router.route('/roster/:course_name')
	.get(function(req, res) {
		api_funcs.get_roster(req.params.course_name).then(data => {
			res.json({data: data});
		});
	});

// Updates the RFID/Card for professor/student
router.route('/card')
	.put(function(req, res) {
		api_funcs.update_card(req.body.uin, req.body.card).then(data => {
			res.json({data: data});
		});
	});

// Send prof data

// Start server
app.use('/api', router);
app.listen(port);
console.log('Running on ' + port);