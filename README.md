# FLYP-EC2-Repo
Database for FLYP capstone project

#### Setup:
```
npm install
pm2 start backend/server.js --name "API"
// If that doesn't work do this first: npm install pm2 -g
```

#### Control:
```
pm2 list // Shows status
pm2 start API
pm2 restart API
pm2 stop API
```

#### Use:

* API on `localhost:3001/api/` or `http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/`

#### API functions
| Path | Type | Input | Output | Desc |
|---   | ---  |---    | ---    |---   |
|  `/class/` | POST | course_name, uin | message | Add new course and assign prof to it|
|  `/class/:class_id/` | PUT | date | message | Add new attendance day to course |
|  `/student/` | POST | uin, first, last, card | message | Add new student |
|  `/student/` | PUT | course_name, uin | message | Insert student into course |
|  `/professor/` | POST | uin, first, last, card | message | Add new professor |
|  `/attendance/` | PUT | uin, course_name, date | num_attended, num_class_days | Set a student as attended and return attendance info |
|  `/attendance/` | GET | course_name | all course table data | Gets all course_name  data |
