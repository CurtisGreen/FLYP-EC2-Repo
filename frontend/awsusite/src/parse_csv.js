

function parse_csv(infile) {
	
	var all_lines = infile.split("\n");
	var col_headers = all_lines[0].split(',');
	var lines = [];
	/*1-last name, 2-first-name, 4-uin*/
	var last_name_list = [];
	var first_name_list = [];
	var uin_list = [];
	
	
	for (var i=1;i<all_lines.length;i++) {
		var data = all_lines[i].split(',');
		last_name_list.push(data[0]);
		first_name_list.push(data[1]);
		uin_list.push(data[3]);
	}
	
	/*output file
	var fs = require('fs');
	
	TODO: configure output file name below
	var file = fs.createWriteStream('output_uin_list.txt');
	file.on('error', function(err) {});
	
	uin_list.forEach(function(line) { file.write(line + '\n'); });
	
	file.end();
	
	*/
	
}