const express = require('express');
const bodyParser = require('body-parser');
const api_funcs = require('./apiFuncs');

// Initialize the app/router
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
let port = 3001;
let router = express.Router();

// General API
router.get('/', function(req, res) {
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
		api_funcs.inc_course_days(req.params.course_name);
		res.json({message: 'Success'});
	});

// Add new student
router.route('/student')
	// Students table
	.post(function(req, res) {
		api_funcs.add_student(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	})

	// Add student to class
	.put(function(req, res) {
		api_funcs.populate_course(req.body.course_name, req.body.uin);
		res.json({message: 'Success'});
	});

// Add new professor
router.route('/professor')
	.post(function(req, res) {
		api_funcs.add_professor(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	});

// Set a student's attendance and return num attended
// TODO: check if it returns the right number of days attended or if we need to return +=1
router.route('/attendance')
	.put(function(req,res) {
		api_funcs.update_attendance(req.body.uin, req.body.course_name, req.body.date);
		api_funcs.inc_days_attended(req.body.uin, req.body.course_name);
		api_funcs.get_num_attended(req.body.uin, req.body.course_name).then(num_att => {
			api_funcs.get_num_class_days(req.body.course_name).then(num_days => {
				res.json({num_attended: num_att, num_class_days: num_days});
			});
		});
	});


// Start server
app.use('/api', router);
app.listen(port);
console.log('Running on ' + port);