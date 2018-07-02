import React, { Component } from 'react';
import './App.css';
import CreateListButtons from '../components/CreateListButtons.js'
import ShowProfile from '../components/ShowProfile'
import getData2 from '../components/APICalls.js'

const ROOTURL = "https://swapi.co/api/"

class App extends Component {
  constructor() {
    super();
    this.state = {
      resourceNames : ["people", "films"],
      selectedPerson : null,
      // include a display object and call it from render
      // will be updated according to user input
      // initialise first page in componentDidMount
    }
  }

  componentDidMount () {
    this.setRoot();
    //only call this when required
    this.getData("people");
  }

  componentDidUpdate () {

  }

  setRoot = async () => {
    this.setState({rootData : await getData2(ROOTURL)})
  }

  handleClick = (i) => {
    this.setState({selectedPerson : this.state.people[i]})
  }

  getData = async (resourceName, array = [], page=1) => {
    const url = ROOTURL + resourceName + "/?page=" + page;
    const fetchedData = await getData2(url);
    const newArray = array.concat(fetchedData.results);
    const newObject = {};
    newObject[resourceName] = newArray;
    if (fetchedData.next) {
        this.setState (newObject);
        this.getData(resourceName, newArray, page += 1);
      } else {
        this.setState (newObject);
      }
  }

  render() {
    return !this.state.people ?
      <div>Loading</div> :
      (
        <div className = "flexContainer">
          <div className = "flexContainer">
            <CreateListButtons 
              list={this.state.people}
              handleClick={this.handleClick}
            />
          </div>
          <div className = "flexContainer">
            <ShowProfile selectedPerson={this.state.selectedPerson} />
          </div>
        </div>
      )
  }
}

export default App;
