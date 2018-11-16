import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Calls API
function callApi(url = '', data = {}, type = '') {
	return fetch(url, {
    method: type,
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(data)
	})
	.then(response => response.json())
  .catch(err => console.error(err));
}

/* Example workflow:
  0) let data = login(profUin);
    looks like: data.courses = ["CSCE_121_500", "CSCE_222_500"];
  1) addStudent("111001111", "Curtis", "Green", "card number here");
  2) addProfessor("222002222", "notCurtis", "notGreen", "card number here");
  3) addClass("CSCE_121_500", "222002222");
  4) addStudentToClass("CSCE_121_500", "111001111");
  5) addAttendanceDay("CSCE_121_500", "2018_11_14");
  6) let data = trackAttendance("111001111", "CSCE_121_500", "2018_11_14");
    data.num_attended, data.num_class_days
  7) let csv = getAttendance("CSCE_121_500");
    csv is a string in csv format
    download csv

*/

///////////////////////////////////////////////////////
//          Functions for calling API
///////////////////////////////////////////////////////
function testApi() {
    callApi('localhost:3001/api', {test: "test"}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

function addClass(courseName, profUin) {
    callApi('localhost:3001/api/class', {course_name: courseName, uin: profUin}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

function addAttendanceDay(courseName, courseDate) {
    callApi('localhost:3001/api/class/' + courseName, {date: courseDate}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

function addStudent(uin, firstName, lastName, cardNum) {
    callApi('localhost:3001/api/student', {uin: uin, first: firstName, last: lastName}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

function addStudentToClass(courseName, uin) {
    callApi('localhost:3001/api/student', {course_name: courseName, uin: uin}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

function addProfessor(uin, firstName, lastName, cardNum) {
    callApi('localhost:3001/api/professor', {uin: uin, first: firstName, last: lastName}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

let trackAttendance = (studUin, courseName, date) => {
  return new Promise ((resolve, reject) => {
    callApi('localhost:3001/api/attendance', {uin: studUin, course_name: courseName, date: date}, "PUT")
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => console.error(error));
  });
}

let getAttendance = (courseName) => {
  return new Promise ((resolve, reject) => {
    callApi('localhost:3001/api/attendance' + courseName, "GET")
      .then(data => {
        console.log(JSON.stringify(data));
        resolve(JSON.stringify(data));
      })
      .catch(error => console.error(error));
  })
}

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };

  } 
  render() {
    return (<div>
      Hello World
      <ul>
        {this.state.posts.map(post => <li>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>}
      </ul>
    </div>);
  }
}

ReactDOM.render(
  <Posts />,
  mountNode
);