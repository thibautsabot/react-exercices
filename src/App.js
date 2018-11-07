import "./App.css";

import React, { Component } from "react";

import deleteIcon from "./rubbish-bin.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    fetch("https://api.thecatapi.com/v1/images/search?format=json&limit=20", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "ddc1e77f-a2f8-43a6-a4b9-2e04242a8c75"
      }
    })
      .then(results => results.json())
      .then(results => {
        this.setState({
          results
        });
      });
  }

  onDelete = id => {
    this.setState({
      results: this.state.results.filter(res => res.id !== id) // filter method creates a new array with all elements that pass the test
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Bonjour. Voici des chats :</h1>
        <ul className="grid">
          {this.state.results.map((res, index) => (
            <li key={res.id} className="element">
              <img className="catImage" src={res.url} alt="cat" />
              <button onClick={() => this.onDelete(res.id)}>
                <img className="deleteIcon" src={deleteIcon} alt="delete" />
                Ce chat est moche
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
