import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters : [],
      url : "https://swapi.co/api/people/",
    }
  }

  componentDidMount () {
    fetch(this.state.url)
    .then(response => response.json())
    .then(response => this.setState({characters : response.results}))
  }

  render() {
    return !this.state.characters.length ?
        <div>Loading</div> :
        (
          <div className="App">
            <header className="App-header">
              {this.state.characters[0].name}
            </header>
          </div>
        )
  }
}

export default App;
