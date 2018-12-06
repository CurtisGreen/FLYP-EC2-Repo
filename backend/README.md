# FLYP-EC2-Repo
API and database for FLYP

### Setup:

Schema:

0) (Might need to install & run MySQL/MariaDB)
1) [Connect to DB through MySQL workbench](backendSetup.md)
2) Run schema.sql


API:
```
npm install
pm2 start backend/server.js --name "API"
// If that doesn't work do this first: npm install pm2 -g
```

### Control:
```
pm2 list // Shows status
pm2 start API
pm2 restart API
pm2 stop API
```

### Use:

* API on `localhost:3001/api/` or `http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/`

### API functions
| Path | Type | Input | Output | Desc |
|---   | ---  |---    | ---    |---   |
|  `/class/` | POST | course_name, uin |  | Add new course and assign prof to it|
|  `/class/:class_id/` | PUT | date |  | Add new attendance day to course |
|  `/student/` | POST | uin, first, last, card |  | Add new student |
|  `/student/` | PUT | course_name, uin |  | Insert student into course |
|  `/professor/` | POST | uin, first, last, card |  | Add new professor |
|  `/professor/` | GET | |  | Get list of professors |
|  `/professor/:uin/courses/` | GET | | array of courses | Get list of courses for a prof |
|  `/professor/:uin/exists/` | GET | | Boolean | T/F whether prof with given uin exists |
|  `/attendance/` | PUT | uin, course_name, date | num_attended, num_class_days | Set a student as attended and return attendance info |
|  `/attendance/:course_name/` | GET | | attendance csv | Gets attendance in csv format |
|  `/roster/:course_name/` | GET | | course roster | Gets all student info for a given class |
|  `/card/` | PUT | uin, card | | Set a student as attended and return attendance info |
