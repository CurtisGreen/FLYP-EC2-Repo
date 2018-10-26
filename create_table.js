






var create_tbl_command;
var class_name;
//Class name in format of XXXX-###-### 
//UINs
function gen_Create_Table(class_name) {
	
	/*
	CREATE TABLE IF NOT EXISTS &&class_name&& {
		stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN),
		
	}
	*/
	
	
	create_tbl_command = "CREATE TABLE IF NOT EXISTS " + class_name + " { stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN) }";
	
	
}


//command to add a new column to a table
//date_input is the current date/name of the new column
//table_name is the table name/class name that needs to be modified
//date_input in form of YYYYMMDD
//table_name in format of XXXX-###-###
//add_date_col_command is the resulting SQL command
var date_input;
var table_name;
var add_date_col_command;
function add_date_column(date_input, table_name, add_date_col_command) {
	
	/*
		ALTER TABLE &&table_name&&
		ADD &&date_input&& BOOLEAN SET DEFAULT FALSE;
	*/
	add_date_col_command = "ALTER TABLE " + table_name + " ADD " + date_input + " BOOLEAN SET DEFAULT FALSE;";
	
}


//new command

var add_student_command;
function add_student(student_uin_in,student_first_in,student_last_in,student_card_in) {
	
	/*
		INSERT INTO Capstone.students(uin,firstName,lastName,cardNum)
		VALUES ('uin_in','firstName_in','lastName_in','cardNum_in');
	*/
	
	add_student_command = "INSERT INTO Capstone.students(uin,firstName,lastName,cardNum) VALUES ('" + 
							student_uin_in + "','" +
							student_first_in + "','" +
							student_last_in + "','" +
							student_card_in + "');";
	
}




var add_professor_command;
function add_professor(professor_uin_in,professor_first_in,professor_last_in,professor_card_in) {
	
	/*
		INSERT INTO Capstone.professors(uin,firstName,lastName,cardNum)
		VALUES ('uin_in','firstName_in','lastName_in','cardNum_in');
	*/
	
	add_professor_command = "INSERT INTO Capstone.professors(uin,firstName,lastName,cardNum) VALUES ('" + 
							professor_uin_in + "','" +
							professor_first_in + "','" +
							professor_last_in + "','" +
							professor_card_in + "');";
							
	return add_professor_command;
}

module.exports = {gen_Create_Table: gen_Create_Table};