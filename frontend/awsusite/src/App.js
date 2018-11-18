import React, { Component } from "react";
import { Redirect } from "react-router";
import Dropzone from 'react-dropzone'
import "./App.css";

import * as api from "./apiCalls.js";


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
          className = "AddClassButton"
          onClick = {this.props.onClick}
        >
          Add Class
        </button>
    );
  }

}

class DragAndDrop extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  render() {

    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png, text/csv"
            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
          >
            <p>Drag and drop the class roster (.csv file) from Howdy.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
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

/* Old stuff
  <textarea
    className = "UINform"
    placeholder = "UIN"
    onChange = {this.props.onUNChange}
  />
*/



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
          className = "AddClassName"
          placeholder = "xxxx"
          onChange = {this.props.onClassNameChange}
        />
        <textarea
          className = "AddClassNum"
          placeholder = "xxx"
          onChange = {this.props.onClassNumChange}
        />
        <textarea
          className = "AddClassSec"
          placeholder = "xxx"
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
          className = "AddProfFirstName"
          placeholder = "First Name"
          onChange = {this.props.handleProfFirstNameChange}
        />
        <textarea
          className = "AddProfLastName"
          placeholder = "Last Name"
          onChange = {this.props.handleProfLastNameChange}
        />
        <textarea
          className = "AddProfUIN"
          placeholder = "UIN"
          onChange = {this.props.handleProfUINChange}
        />
      </div>
    );
  }

}

class ClassList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
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
    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.handleNewProfSubmit = this.handleNewProfSubmit.bind(this);
    this.handleDragAndDropShow = this.handleDragAndDropShow.bind(this);
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
      CSVfiles: [],
      classes: [],
      currClassName: ""
    };
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
      }
     });
    //console.log(data);

    //Ask for first and last name, call addProfessor(
		//set error message visible
    //this.setState( prevState => { phase1hidden: !prevState.phase1hidden } );
  }

  handleCSVSubmit(CSVarray) {
    var ClassInfo = this.state.ClassName + "_" + this.state.ClassNum + "_" + this.state.ClassSec;
    
    console.log( "Class Info Submitted:" + ClassInfo);
    console.log( "CSV Submitted", CSVarray );
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

  }

  handleDragAndDropShow() {
    console.log("Show Add button clicked");
    this.setState( prevState => ({DragAndDropHidden: !prevState.DragAndDropHidden}));
  }

   handleClassListChange(e) {
    console.log( "New Item = " + e.target.value )
  }

  handleClassListSubmit(e) {
    if (!this.state.currClassName.length) {
      return;
    }
    const newItem = {
      currClassName: this.state.currClassName,
      id: Date.now()
    };
    this.setState(state => ({
      classes: state.classes.concat(newItem),
      currClassName: ''
    }));
  }



  renderRedirect = () => {
    if( this.state.redirect === true ) {
      return <Redirect to="" />
    }
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
          	<div>
              <h3>Current Classes</h3>
              <ClassList items={this.state.classes} />
              <form onSubmit={this.handleClassListSubmit}>
                <label htmlFor="new-todo">
                  What needs to be done?
                </label>
                <input
                  id="new-todo"
                />
                <button>
                  Add #{this.state.classes.length + 1}
                </button>
              </form>
            </div>
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
