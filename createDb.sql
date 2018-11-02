/*DROP DATABASE IF EXISTS Capstone;*/
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
	course_id CHAR(12),
	uin CHAR(9),
    num_held INT,
    PRIMARY KEY (course_id),
    FOREIGN KEY (uin) REFERENCES Capstone.professors(uin)
);

