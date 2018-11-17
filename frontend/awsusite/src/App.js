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
        <h2>Create Class</h2>
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

class App extends Component {

  constructor(props) {
    super(props);
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.handleDragAndDropShow = this.handleDragAndDropShow.bind(this);
    this.state = {
      UNval: "un",
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

  handleSubmit() {
    const UNval = this.state.UNval;
    console.log( "Submit button captured: \nUNval: " + UNval );
    // Hash PWval and send it somewhere

    // Send backend the UIN, get response

    //if(response is good){
    	this.setState({ phase1hidden: true,
    					phase2hidden: false });
	//else
		//set error message visible
    //this.setState( prevState => { phase1hidden: !prevState.phase1hidden } );
  }

  handleCSVSubmit(CSVarray) {
    console.log( "CSV Submitted", CSVarray );
  	//this.setState({CSVfiles: state.accepted });

  }

  handleDragAndDropShow() {
    console.log("Show Drag and Drop button clicked");
    this.setState({DragAndDropHidden: false})
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
            />
            <Submitbutton
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
            <AddClassButton
              onClick = { () => this.handleDragAndDropShow() }
            />
            <div id = "DaD"
              hidden = {this.state.DragAndDropHidden}
            >
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
