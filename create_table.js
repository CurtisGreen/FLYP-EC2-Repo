
/*
TODO: 
Queries for
3) setting a student's attendance and setting the num days attended
4) setting num class days when a new date column is added
*/

// Add new student
let add_student = (uin, first_name, last_name, card) => {
	return new Promise ((resolve, reject) => {
		resolve("INSERT INTO Capstone.students(uin,firstName,lastName,cardNum) VALUES ('" + 
						uin + "','" +
						first_name + "','" +
						last_name + "','" +
						card + "');"
					);

	});
	/*
		INSERT INTO Capstone.students(uin,firstName,lastName,cardNum)
		VALUES ('uin','firstName','lastName','cardNum');
	*/	
}

// Add new professor
let add_professor = (uin, first_name, last_name, card) => {
	return new Promise ((resolve, reject) => {
		resolve("INSERT INTO Capstone.professors(uin,firstName,lastName,cardNum) VALUES ('" + 
						uin + "','" +
						first_name + "','" +
						last_name + "','" +
						card + "');"
					);

	});
	/*
		INSERT INTO Capstone.professors(uin,firstName,lastName,cardNum)
		VALUES ('uin','firstName','lastName','cardNum');
	*/
}

// Assign professor to course
let insert_course = (course_id, uin) => {
	return new Promise ((resolve, reject) => {
		resolve("INSERT INTO Capstone.courses(course_id, uin, num_held) VALUES ('" + 
						course_id + "','" +
						uin + "'," +
						0 + ");"
					);
	});
}

// Creates attendance roster for a class
// Class name in format of XXXX-###-### 
let create_attendance_table = (class_name) => {
	return new Promise ((resolve, reject) => {

		resolve("CREATE TABLE IF NOT EXISTS " + class_name + `
			( 
				uin CHAR(9),
				classes_attended int(3) DEFAULT 0,
				FOREIGN KEY (uin) REFERENCES Capstone.students(uin) 
			);
		 `);
	
	});
	
	/*
	CREATE TABLE IF NOT EXISTS &&class_name&& {
		uin CHAR(9),
		total_classes int(3) DEFAULT 0,
		classes_attended int(3) DEFAULT 0,
		FOREIGN KEY (uin) REFERENCES Capstone.students(uin)
	}
	*/	
}

// Add student to course roster
let populate_course = (course_id, uin) => {
	return new Promise ((resolve, reject) => {
		resolve("INSERT INTO Capstone." + course_id + "(uin) VALUES ('" + uin + "');");
	});
}

// Add new attendance day column to the table
// date_input is the current date/name of the new column: YYYY_MM_DD
// table_name is the table name/class name XXXX-###-###
let add_date_column = (date, table_name) => {
	return new Promise ((resolve, reject) => {
		resolve("ALTER TABLE " + table_name + " ADD " + date + " BOOLEAN DEFAULT FALSE;");
	});
	/*
		ALTER TABLE &&table_name&&
		ADD &&date_input&& BOOLEAN DEFAULT FALSE;
	*/
}

module.exports = {add_student, add_professor, insert_course, create_attendance_table, populate_course, add_date_column};

//attendance average
/*
	SELECT uin, 
*/

