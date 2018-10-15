CREATE TABLE IF NOT EXISTS capstone.courses (
    courseId char(12) NOT NULL PRIMARY KEY,
    profUin char(9) NOT NULL REFERENCES professors(uin)
);

CREATE TABLE IF NOT EXISTS capstone.professors (
	uin char(9) NOT NULL PRIMARY KEY,
    firstName varchar(20) NOT NULL,
    middleName varchar(20),
    lastName varchar(20) NOT NULL,
    cardNum varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS capstone.students (
	uin char(9) NOT NULL PRIMARY KEY,
    firstName varchar(20) NOT NULL,
    middleName varchar(20),
    lastName varchar(20) NOT NULL,
    cardNum varchar(20) NOT NULL
); 

CREATE TABLE IF NOT EXISTS capstone.attendance (
	studentUin char(9) NOT NULL REFERENCES students(uin),
    courseId char(12) NOT NULL REFERENCES courses(courseId),
    dt datetime
);