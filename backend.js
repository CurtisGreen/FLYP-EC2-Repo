const express = require('express');
const bodyParser = require('body-parser');

const api_funcs = require('./apiFuncs');

let uin = 888008888;
let course_name = "CSCE_121_500";


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
		api_funcs.create_attendance_table(req.body.name);
		res.json({message: 'Success'});
	});

// Add new attendance day to class
router.route('/class/:class_id')
	.put(function(req, res) {
		api_funcs.add_date_column(req.body.date, req.params.class_id);
		api_funcs.inc_course_days(req.params.class_id);
		res.json({message: 'Success'});
	});

// Add new student
router.route('/student')
	.post(function(req, res) {
		api_funcs.add_student(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	});

// Add new professor
router.route('/professor')
	.post(function(req, res) {
		api_funcs.add_professor(req.body.uin, req.body.first, req.body.last, req.body.card);
		res.json({message: 'Success'});
	});

// Set a student's attendance and return num attended
router.route('/attendance')
	.put(function(req,res) {
		api_funcs.update_attendance(req.body.uin, req.body.course_name, req.body.date);
		api_funcs.inc_days_attended(req.body.uin, req.body.course_name);
		api_funcs.get_num_attended(req.body.uin, req.body.course_name).then(num_att => {
			api_funcs.get_num_class_days(req.body.course_name).then(num_days => {
				res.json({num_attended: num_att, get_class_days: num_days});
			});
		});
	});


// Start server
app.use('/api', router);
app.listen(port);
console.log('Running on ' + port);