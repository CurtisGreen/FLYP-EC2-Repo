# FLYP-EC2-Repo
Database for FLYP capstone project

* API on `localhost:3001/api/`

#### API functions
| Path | Type | Input | Output |
|---   | ---  |---    | ---    |
|  `/class/` | POST | course_name, uin | message |
|  `/class/:class_id/` | PUT | date | message |
|  `/student/` | POST | uin, first, last, card | message |
|  `/student/` | PUT | course_name, uin | message |
|  `/professor/` | POST | uin, first, last, card | message |
|  `/attendance/` | PUT | uin, course_name, date | num_attended, num_class_days |