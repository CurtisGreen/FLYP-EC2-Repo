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
        <form
          action="/action_page.php"
          onChange = {this.props.onUNChange}
        >
        UIN: <input type="text" name="uin" pattern="^[0-9]{3}00[0-9]{4}$" title="Enter a valid UIN"/>
          <input 
            type="submit"
            onClick = {this.props.onClick}
          />
        </form>
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
          classNum = "AddClassNum"
          placeholder = "xxx"
          onChange = {this.props.onClassNumChange}
        />
        <textarea
          classSec = "AddClassSec"
          placeholder = "xxx"
          onChange = {this.props.onClassSecChange}
        />
      </div>
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.handleDragAndDropShow = this.handleDragAndDropShow.bind(this);
    this.state = {
      UNval: "un",
      ClassName: "null",
      ClassNum: "000",
      ClassSec: "000",
      redirect: false,
      phase1hidden: false,
      phase2hidden: true,
      DragAndDropHidden: true,
      CSVfiles: []
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

  handleSubmit() {
    const UNval = this.state.UNval;
    console.log( "Submit button captured: \nUNval: " + UNval );

    // Send backend the UIN, get response


    //if(response is good){
    	this.setState({ phase1hidden: true,
    					phase2hidden: false });
	//else
		//set error message visible
    //this.setState( prevState => { phase1hidden: !prevState.phase1hidden } );
  }

  handleCSVSubmit(CSVarray) {
    var ClassInfo = this.state.ClassName + "_" + this.state.ClassNum + "_" + this.state.ClassSec;
    

    console.log( "Class Info Submitted:" + ClassInfo);
    console.log( "CSV Submitted", CSVarray );
  }

  handleDragAndDropShow() {
    console.log("Show Add button clicked");
    this.setState( prevState => ({DragAndDropHidden: !prevState.DragAndDropHidden}));
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
            <Authbox
              onUNChange = {this.handleUNChange}
              onClick = { () => this.handleSubmit() }
            />
          </div>
          <div id = "phase2"
          	hidden = {this.state.phase2hidden}
          >
          	<center>
          	<br/>
          	<p> Class list shown here </p>	
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
