CREATE DATABASE IF NOT EXISTS Capstone;

CREATE TABLE IF NOT EXISTS Capstone.professors (
	uin CHAR(9) NOT NULL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    cardNum VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Capstone.students (
	uin CHAR(9) NOT NULL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    cardNum VARCHAR(64) NOT NULL
); 

CREATE TABLE IF NOT EXISTS Capstone.courses (
	course_id CHAR(12) PRIMARY KEY,
	uin CHAR(9) FOREIGN KEY REFERENCES Capstone.professors(uin)
);




