# FLYP-EC2-Repo
Database for FLYP capstone project

* API on `localhost:3001/api/`

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
