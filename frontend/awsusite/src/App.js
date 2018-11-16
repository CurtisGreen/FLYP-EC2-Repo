import React, { Component } from "react";
import { Redirect } from "react-router";
import Dropzone from 'react-dropzone'
import "./App.css";


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
          placeholder = "Username"
          onChange = {this.props.onUNChange}
        />
      </div>
    );
  }

}

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

class App extends Component {

  constructor(props) {
    super(props);
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCSVSubmit = this.handleCSVSubmit.bind(this);
    this.state = {
      UNval: "un",
      PWval: "pw",
      redirect: false,
      phase1hidden: false,
      phase2hidden: true,

      CSVfiles: []
    };
  }

  // target = textarea, .value = what's in the textarea
  handleUNChange(e) {
    this.setState({ UNval: e.target.value });
    console.log( "New Unval = " + e.target.value );
  }

  handlePWChange(e) {
    this.setState({ PWval: e.target.value });
    console.log( "New PWval = " + e.target.value );
  }

  handleSubmit() {
    const UNval = this.state.UNval;
    const PWval = this.state.PWval;
    console.log( "Submit button captured: \nUNval: " + UNval + "\nPWval: " + PWval );
    // Hash PWval and send it somewhere

    // Send backend the UIN, get response

    //if(response is good){
    	this.setState({ phase1hidden: true,
    					phase2hidden: false });
	//else
		//set error message visible
    //this.setState( prevState => { phase1hidden: !prevState.phase1hidden } );
  }

  handleCSVSubmit() {

  	//this.setState({CSVfiles: state.accepted });
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

          	<DragAndDrop/>
          	<Submitbutton
              onClick = { () => this.handleCSVSubmit() }
            />
          	</center>
          </div>
          {this.renderRedirect()}
        </div>
      </div>
    );
  }
}

export default App;