import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import CreateListButtons from '../components/CreateListButtons.js'
import ShowProfile from '../components/ShowProfile'

class App extends Component {
  constructor() {
    super();
    this.state = {
      people : [],
      url : "https://swapi.co/api/people/",
      selectedPerson : null,
    }
  }

  componentDidMount () {
    fetch(this.state.url)
    .then(response => response.json())
    .then(response => this.setState({people : response.results}))
  }

  handleClick = (i) => {
    this.setState({selectedPerson : this.state.people[i]})
  }

  render() {
    return !this.state.people.length ?
        <div>Loading</div> :
        (
          <div className="w-100 h-100">
            <div className = "w-100 h-75 bg-blue">
              <CreateListButtons 
                list={this.state.people}
                handleClick={this.handleClick}
              />
            </div>
            <div className = "w-100 h-25 bg-light-blue">
              <ShowProfile selectedPerson={this.state.selectedPerson} />
            </div>
          </div>
        )
  }
}

export default App;
