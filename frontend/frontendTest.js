import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Calls API
function callApi(url = '', data = {}, type = '') {
	return fetch(url, {
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(data)
	})
	.then(response => response.json());
}

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };

    callApi('localhost:3001/api', {test: "test"}, "GET")
    	.then(data => console.log(JSON.stringify(data)))
    	.catch(error => console.error(error));
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