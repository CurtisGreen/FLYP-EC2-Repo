import React, { Component } from "react";
import { Redirect } from "react-router";
import Dropzone from 'react-dropzone'
import "./App.css";

import * as api from "./apiCalls.js";

import { CSVLink, CSVDownload } from "react-csv";
import ReactDOM from 'react-dom';

class Submitbutton extends Component {

  render() {
    return(
        <button
          className = "Submitbutton"
          onClick = {this.props.onClick}
        >
          Submit
        </button>
    );
  }
}

class AddClassButton extends Component {

  render() {
    return(
        <button
          className = "ShowClassUpload"
          onClick = {this.props.onClick}
        >
          Add Class
        </button>
    );
  }
}

class DragAndDrop extends Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: [],
      rawCSV: "",
      fileNameOutput: ""
    }
  }

  onDrop(files){
    console.log("CSVErrMsg")
    console.log(this.props.CSVErrMsg)
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const readAsText = reader.result;
      console.log(readAsText)
      this.setState({ rawCSV: readAsText })
      this.props.CSVtoText( reader.result );
    };
    reader.onabort = () => console.log('file reading aborted');
    reader.onerror = () => console.log('file reading error');
    
    reader.readAsText(files[0]);

    console.log("Get Filename: ")
    console.log(files[0].name)

    this.setState({fileNameOutput: "File Uploaded: " + files[0].name})

    // GIVE readAsText to master App
     
  }

  render() {

    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png, text/csv, application/vnd.ms-excel"
            onDrop={this.onDrop.bind(this)}
        
          >
            <p>Drag and drop the class roster (.csv file) from Howdy.</p>
          </Dropzone>
        </div>
        <aside>
          <br/>
          <p> {this.state.fileNameOutput} </p>
          <br/>
          <Submitbutton
            onClick = {(CSVarray) => this.props.onClick(CSVarray)}
          >
            Submit
          </Submitbutton>
        </aside>
      </section>
    );
  }
}

class Authbox extends Component {

  render() {
    return(
      <div>
        <textarea
          className = "UINform"
          placeholder = "UIN"
          onChange = {this.props.onUNChange}
        />
      </div>
    );
  }
}

class AddClassInfoBoxes extends Component {

  render() {
    return(
      <div>
        <textarea
          className = "ClassInfoTextArea"
          placeholder = "Dept. Name (XXXX)"
          onChange = {this.props.onClassNameChange}
        />
        <textarea
          className = "ClassInfoTextArea"
          placeholder = "Course Number (XXX)"
          onChange = {this.props.onClassNumChange}
        />
        <textarea
          className = "ClassInfoTextArea"
          placeholder = "Section Number (XXX)"
          onChange = {this.props.onClassSecChange}
        />
      </div>
    );
  }
}

class ProfNameBoxes extends Component {

  render() {
    return(
      <div>
        <h2> Enter your first name, last name, and UIN to continute </h2>
        <br/>
        <textarea
          className = "ProfTextArea"
          placeholder = "First Name"
          onChange = {this.props.handleProfFirstNameChange}
        />
        <textarea
          className = "ProfTextArea"
          placeholder = "Last Name"
          onChange = {this.props.handleProfLastNameChange}
        />
        <textarea
          className = "ProfTextArea"
          placeholder = "UIN"
          onChange = {this.props.handleProfUINChange}
        />
      </div>
    );
  }
}

class ClassList extends Component {

  handleClick(i) {
    this.props.onClick(i);
  }

  render() {
    return(
      <ul>
        {this.props.items.map( item => (
          
          <button 
            className = "ClassButton"
            key = {item.text}
            onClick = {() => this.handleClick(item.text)}
          >
            {item.text}
          </button>
          
        ))}
      </ul>
    );
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handleClassNameChange = this.handleClassNameChange.bind(this);
    this.handleClassNumChange = this.handleClassNumChange.bind(this);
    this.handleClassSecChange = this.handleClassSecChange.bind(this);

    this.handleProfFirstNameChange = this.handleProfFirstNameChange.bind(this);
    this.handleProfLastNameChange = this.handleProfLastNameChange.bind(this);
    this.handleProfUINChange = this.handleProfUINChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleSelectedClass = this.handleSelectedClass.bind(this);

    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.handleNewProfSubmit = this.handleNewProfSubmit.bind(this);
    this.handleDragAndDropShow = this.handleDragAndDropShow.bind(this);
    this.setCSVtoText = this.setCSVtoText.bind(this);
    this.state = {
      UNval: "un",
      ClassName: "null",
      ClassNum: "000",
      ClassSec: "000",
      ProfFirstName: "un",
      ProfLastName: "un",
      ProfUIN: "un",
      redirect: false,
      phase1hidden: false,
      profNameReqHidden: true,
      phase2hidden: true,
      DragAndDropHidden: true,
      items: [],
      currClass: "",
      rawCSV: "",
      CSVErrMsg: "hello"
    };
  }

  getCSVInput(rawCSV){
    this.setState({rawCSV: rawCSV});
  }

  // target = textarea, .value = what's in the textarea
  handleUNChange(e) {
    this.setState({ UNval: e.target.value });
    console.log( "New Unval = " + e.target.value );
  }

  handleClassNameChange(e) {
    this.setState({ ClassName: e.target.value });
    console.log( "New ClassName = " + e.target.value );
  }


  handleClassNumChange(e) {
    this.setState({ ClassNum: e.target.value });
    console.log( "New ClassNum = " + e.target.value );
  }


  handleClassSecChange(e) {
    this.setState({ ClassSec: e.target.value });
    console.log( "New ClassSec = " + e.target.value );
  }

  handleProfFirstNameChange(e) {
    this.setState({ ProfFirstName: e.target.value });
  }

  handleProfLastNameChange(e) {
    this.setState({ ProfLastName: e.target.value });
  }


  handleProfUINChange(e) {
    this.setState({ ProfUIN: e.target.value });
  }

  handleSubmit() {
    const UNval = this.state.UNval;
    console.log( "Submit button captured: \nUNval: " + UNval );

    // Send backend the UIN, get response
     api.professorExists(UNval).then(data => {
      console.log(data);
      if(data.data === false){ //Professor DNE
        console.log("Professor DNE")
        this.setState( prevState => ({profNameReqHidden: !prevState.profNameReqHidden}));
      }
      else{ //Professor Exists
        console.log("Professor Exists")
        this.setState( prevState => ({ 
          phase1hidden: !prevState.phase1hidden,
          phase2hidden: !prevState.phase2hidden
         }));
        this.fetchClasses()
      }
     });
    //console.log(data);
    //Ask for first and last name, call addProfessor(
		//set error message visible
    //this.setState( prevState => { phase1hidden: !prevState.phase1hidden } );
  }

  parse_csv(infile) {
  
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


  
  }

  handleCSVSubmit(CSVarray) {
    var ClassInfo = this.state.ClassName + "_" + this.state.ClassNum + "_" + this.state.ClassSec;
    
    //console.log( "Class Info Submitted:" + ClassInfo);

    //var rawCSV = JSON.stringify(CSVarray);
    

    if(this.state.rawCSV == ""){
      this.setState({CSVErrMsg: "Please upload a valid .csv roster file from Howdy."})
      console.log("no CSV file")
      return //Return early
    }
    else{
      console.log("CSV file found")
    }
    
    // parse_csv code below
     var all_lines = this.state.rawCSV.split("\n");
      var col_headers = all_lines[0].split(',');
      var lines = [];
      //1-last name, 2-first-name, 4-uin
      var last_name_list = [];
      var first_name_list = [];
      var uin_list = [];
      
      
      for (var i=1;i<all_lines.length;i++) {
        var data = all_lines[i].split(',');
        if(data[3] != null){
          last_name_list.push(data[0]);
          first_name_list.push(data[1]);
          uin_list.push(data[3]);
        }
      }
      ///////////////


      api.addClass(ClassInfo, this.state.UNval);
      let functionArr = []; 

    
        api.addStudent(uin_list, first_name_list, last_name_list, ClassInfo);

      this.setState( prevState => ({ 
          DragAndDropHidden: !prevState.DragAndDropHidden,
       }));
    
    this.fetchClasses()

  }

  handleNewProfSubmit() {

    var UIN = this.state.ProfUIN
    var FirstName = this.state.ProfFirstName
    var LastName = this.state.ProfLastName

    //console.log("AddProfessor(" + UIN + "," + FirstName + "," + LastName + ")" )

    api.addProfessor(UIN, FirstName, LastName)

    this.setState( prevState => ({ 
          phase1hidden: !prevState.phase1hidden,
          phase2hidden: !prevState.phase2hidden
         }));

    console.log("New Prof Submitted");
    this.fetchClasses()
  }

  fetchClasses() {

    const UNval = this.state.UNval;

    this.setState({items: []});

    api.getCourses( UNval ).then( data => {

      console.log( "Profs courses:", data.data );
      for( let i = 0; i < data.data.length; ++i ) {

        const className = data.data[i].course_id;
        const key = className;
        console.log( "Adding class:" + className );

        const newItem = { text: className, key: key };

        this.setState( prevState => ({ 
          items: prevState.items.concat( newItem )
        }));
      }

    });
  }

  handleSelectedClass( chosenClass ) {

    console.log( "Chose class: " + chosenClass );

    this.setState( prevState => ({ 
      tracking: !prevState.tracking,
      currClass: chosenClass
    }));

    const currentDate = this.state.date;
    //api.addAttendanceDay( chosenClass, currentDate );

    const currClass = this.state.currClass;
    console.log( "Pulling student roster for: " + chosenClass );

    api.getAttendance( chosenClass ).then(data => {
      console.log("getAttendance():")
      console.log(data.data)
      var rosterCSV = data.data

      //this.setState({ Roster: data.data });
      var fileName = chosenClass + ".csv"
      //Output .csv file for browser download
      const element= (<CSVDownload data={rosterCSV} filename={fileName} target="_blank" />);

      console.log("CSV length:" + rosterCSV.length)

      if(rosterCSV.length == 0){
        console.log("Empty class download attempted")
      }
      else{
        ReactDOM.render(element, document.querySelector('#tempFileIO'));
      }
      
      //<CSVDownload data={rosterCSV} target="_blank" />;

    });
    
  }

  handleDragAndDropShow() {
    console.log("Show Add button clicked");
    this.setState( prevState => ({DragAndDropHidden: !prevState.DragAndDropHidden}));
  }

  setCSVtoText(i) {

    console.log( "rawCSV set to:", i );
    this.setState({ rawCSV: i });

  }

  render() {

    return (
      <div>
        <div id = "wrapCenter" className = "topHUD">
          <div id = "center">
            <b>FLYP Portal</b>
            <div>
              Please Login
            </div>
          </div>
        </div>
        <div id = "wrapCenter"> 
          <div id = "phase1"
          	hidden = {this.state.phase1hidden}
          >
            <div id = "phase1Main"
              hidden = {this.state.profNameReqHidden === false}
            >
              <Authbox
                onUNChange = {this.handleUNChange}
              />
              <Submitbutton
                onClick = { () => this.handleSubmit() }
              />
            </div>
            <div id = "profNameReq"
              hidden = {this.state.profNameReqHidden}
            >
              <ProfNameBoxes
                handleProfFirstNameChange = {this.handleProfFirstNameChange}
                handleProfLastNameChange = {this.handleProfLastNameChange}
                handleProfUINChange = {this.handleProfUINChange}
              />
              <Submitbutton
                onClick = { () => this.handleNewProfSubmit() }
              />
            </div>
          </div>
          <div id = "phase2"
          	hidden = {this.state.phase2hidden}
          >
          	<center>
          	<br/>
            <ClassList
              items = {this.state.items}
              onClick = {i => this.handleSelectedClass(i)}
            />
            <div id="tempFileIO"/>
			      <br/>
            <div hidden = {!this.state.DragAndDropHidden} >
              <AddClassButton
                onClick = { () => this.handleDragAndDropShow() }
              />
            </div>
            <div id = "DaD"
              hidden = {this.state.DragAndDropHidden}
            >
              <h2>Create Class</h2>
              <AddClassInfoBoxes
                onClassNameChange = {this.handleClassNameChange}
                onClassNumChange = {this.handleClassNumChange}
                onClassSecChange = {this.handleClassSecChange}
              />
              <br/>
              <DragAndDrop
                 onClick = {(CSVarray) => this.handleCSVSubmit(CSVarray)}
                 CSVtoText = {i => this.setCSVtoText(i)}
              />
            </div>
          	</center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
