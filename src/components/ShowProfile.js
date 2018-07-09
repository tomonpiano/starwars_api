import React, {Component} from 'react';
import {createButton, CreateListButtons} from './CreateListButtons.js'

const isEmpty = function (query) {
  if (query.length === 0) {
    return true;
  }
}

const isLink = function (stringQuery) {
  try {
    if (stringQuery.slice(0,5) === "https") {
      return true;
    }
  }
  catch(err) {
    console.log("ERROR. Can't perform slice on: "+ stringQuery);
    console.log(err);
  }   
}

const isListOfLinks = function (query) {
  if (!isEmpty(query)) {
    if (isLink(query[0])) {
      return true
    } 
  }
}

class ShowProfile extends Component {
  state = {}

  componentDidMount() {
    this.getEntryLink(this.props.selection)
    //when rerendering not being called

  }

  linkToButton = async (url) => {
    const jsonData = await fetch(url)
    const objectData = await jsonData.json()
    const onClick = () => {
      return this.props.handleClick(objectData);
    }
    const button = createButton(objectData, onClick);
    return button;
  }

  linksToButtonList = async (urlList) => {
    const buttonList = await Promise.all(urlList.map(async (element) => {
      return await this.linkToButton(element);
    }))
    return buttonList;
  }
  

  getEntryLink = (selectionObject) => {
    const entries = Object.entries(selectionObject);
    entries.forEach(async (entry) => {
      const key = entry[0]
      const value = entry[1]
      if (isLink(value)) {
        this.setState({[key] : await this.linkToButton(value)});
      }
      if (isListOfLinks(value)) {
        this.setState({[key] : await this.linksToButtonList(value)})
      }
    })
  }

  componentDidUpdate() {
    
  }

  render() {
    const selection = this.props.selection;
    const entries = Object.entries(selection);
    // don't need to assign props to state.
    // do all operations on props
    const tableOutput = entries.map((entry) => {
      let value = ""
      if (this.state[entry[0]]) {
        value = this.state[entry[0]];
      }
      else {value = entry[1];}
      return (
        <tr key={entry[0]}>
          <td>{entry[0].replace("_"," ")}</td>
          <td>{value}</td>
        </tr>
      )
    })
    return (
      <table>
        <tbody>
          {tableOutput}
        </tbody>
      </table>
    )       
  }
}

export default ShowProfile;