import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people : [],
      url : "https://swapi.co/api/people/",
    }
  }

  componentDidMount () {
    fetch(this.state.url)
    .then(response => response.json())
    .then(response => this.setState({people : response.results}))
  }

  createListButtons (list) {
    const buttonList = list.map((element, i) => {
      return (
      <div key={i}>
        <button onClick={() => this.handleClick(i)}>
          {element.name}
        </button>
      </div>
      )
    });
    return (
      buttonList
    )
  }

  handleClick (i) {
    return console.log("clicked: " + this.state.people[i].name)
  }

  render() {
    return !this.state.people.length ?
        <div>Loading</div> :
        (
          <div>
            <h1>
              {this.createListButtons(this.state.people)}
            </h1>
          </div>
        )
  }
}

export default App;
