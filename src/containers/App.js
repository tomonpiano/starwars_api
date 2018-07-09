import React, { Component } from 'react';
import './App.css';
import {CreateListButtons} from '../components/CreateListButtons.js'
import ShowProfile from '../components/ShowProfile'
import {getData, getUrl} from '../components/APICalls.js'

const ROOTURL = "https://swapi.co/api/"

class App extends Component {
  constructor() {
    super();
    this.state = {
      category : null,
      apiRoot: {},
      selection: null,
    };
  }

  componentDidMount () {
    this.setRoot();
  }

  setRoot = async () => {
    this.setState({apiRoot : await getData()});
    this.setState({category : "apiRoot"});
  }

  setData = async (resourceName, existingResources = [], page=1) => {
    const url = ROOTURL + resourceName + "/?page=" + page;
    const fetchedData = await getUrl(url);
    let resources;
    if (fetchedData.results[0].title) { //handles film entry .name = .title
      resources = fetchedData.results.map((entry) => {
        entry.name = entry.title;
        return entry;        
      })
    }
    resources = existingResources.concat(fetchedData.results);
    const newObject = {};
    newObject[resourceName === "" ? "apiRoot" : resourceName] = resources;
    if (fetchedData.next) {
        this.setState (newObject);
        this.setData(resourceName, resources, page += 1);
      } else {
        this.setState (newObject);
      }
  }

  handleClick = async (buttonObject) => {
    const buttonName = buttonObject.name;
    if (!this.state[buttonName] && buttonObject.id === "root") {
      await this.setData(buttonName);
    }
    if (buttonObject.id === "root") {
      this.setState({category: buttonName});
    } else {
      this.setState({selection : buttonObject});
    } 
  }

  objectList = () => {
    const categoryString = this.state.category;
    const categoryObject = this.state[categoryString];
    if (categoryObject === this.state.apiRoot) {
      return Object.keys(categoryObject).map((entry) => 
        ({name: entry, id: "root"}));
    } else {
      return categoryObject;
    }
  }

  componentDidUpdate () {
    console.log("Main App updated");
  }

  render() {
    if (!this.state.category) {
      return <div>Loading</div>;
    } else if (!this.state.selection) {
      const buttonList = this.objectList();
      return (
        <div className = "flexContainer">
          {CreateListButtons(buttonList, this.handleClick)} 
        </div>
          
      );
    } else {
      return (
      <div className = "flexContainer">
        <ShowProfile 
          selection={this.state.selection}
          handleClick={this.handleClick}
        />
      </div>
        );
      }
    }
  }

export {App, ROOTURL};
