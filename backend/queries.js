
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

		resolve("CREATE TABLE IF NOT EXISTS Capstone." + class_name + `
			( 
				uin CHAR(9),
				classes_attended int(3) DEFAULT 0,
				FOREIGN KEY (uin) REFERENCES Capstone.students(uin) 
			);
		 `);
	
	});
}

// Add student to course roster
let populate_course = (course_id, uin) => {
	return new Promise ((resolve, reject) => {
		resolve("INSERT INTO Capstone." + course_id + "(uin) VALUES ('" + uin + "');");
	});
}

// Add new attendance day column to the table
// date_input is the current date/name of the new column: YYYY_MM_DD
// table_name is the table name/class name XXXX_###_###
let add_date_column = (date, table_name) => {
	return new Promise ((resolve, reject) => {
		resolve("ALTER TABLE " + table_name + " ADD " + date + " BOOLEAN DEFAULT FALSE;");
	});
	/*
		ALTER TABLE &&table_name&&
		ADD &&date_input&& BOOLEAN DEFAULT FALSE;
	*/
}

// Set a student as present
let update_attendance = (uin, course_name, date) => {
	return new Promise ((resolve, reject) => {
		resolve("UPDATE Capstone." + course_name + 
					" SET " + date + "= TRUE" + 
					" WHERE uin = " + uin + ";");
	});
}

// Add 1 to days attended
let inc_days_attended = (uin, course_name) => {
	return new Promise ((resolve, reject) => {
		resolve(`UPDATE Capstone.` + course_name + `
					SET classes_attended = classes_attended + 1 
					WHERE uin = ` + uin + ";");
	});
}

// Add 1 to number of course days
let inc_course_days = (course_name) => {
	return new Promise ((resolve, reject) => {
		resolve(`UPDATE Capstone.courses
					SET num_held = num_held + 1 
					WHERE course_id = '` + course_name + "';");
	});
}

// Get number of classes attended
let get_num_attended = (uin, course_name) => {
	return new Promise ((resolve, reject) => {
		resolve(`SELECT classes_attended 
					FROM Capstone.` + course_name + 
					" WHERE uin = " + uin + ";"
				);
	});
}

// Get number of classes that have been heldd
let get_num_class_days = (course_name) => {
	return new Promise ((resolve, reject) => {
		resolve(`SELECT num_held 
					FROM Capstone.courses
					WHERE course_id = '` + course_name + "';"
				);
	});
}

let get_attendance = (course_name) => {
	return new Promise ((resolve, reject) => {
		resolve("SELECT * FROM Capstone." + course_name);
	});
} 

// Export to be used in other file
module.exports = {
	add_student, add_professor, insert_course, create_attendance_table,
	populate_course, add_date_column, update_attendance, inc_days_attended,
	inc_course_days, get_num_attended, get_num_class_days, get_attendance
};
