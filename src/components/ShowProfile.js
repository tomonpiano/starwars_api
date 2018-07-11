import React, {Component} from 'react';
import {createButton} from './CreateListButtons.js';
import '../containers/App.css';

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
    //console.log("ERROR. Can't perform slice on: "+ stringQuery);
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

  constructor(props) {
    super(props);
    this.state = ({
      selection : this.props.selection,
      column2 : Object.values(this.props.selection),
      loading : false,
    });
  }

  componentDidMount() {
    const column2 = this.state.column2;
    this.convertColumn2ToButton(column2);
  }

  componentDidUpdate() {
    if(this.props.selection !== this.state.selection) {
      this.setState({selection : this.props.selection})
      this.setState({column2 : Object.values(this.props.selection)})
      this.convertColumn2ToButton(Object.values(this.props.selection));
    }
  }

  setLoadingText(column2) {
    const output = column2.map((cell) => {
      if ((isLink(cell) || isListOfLinks(cell))) {
        return "Loading";
      } else {
        return cell;
      }
    })
    return output;
  }

  convertColumn2ToButton = async (list) => {
    this.setState({loading : true})
    const newColumn2 = Promise.all(list.map((element) => {
      if (isLink(element)){
        const button = this.linkToButton(element);
        return (button);
      } else if (isListOfLinks(element)) {
        const buttons = this.linksToButtonList (element);
        return buttons;
      } else {
        return element
      }
    }))
    this.setState({
      column2 : await newColumn2,
      loading : false})
  }

  linkToButton = async (url) => {
    const jsonData = await fetch(url)
    const objectData = await jsonData.json()
    const onClick = () => {
      return this.props.handleClick(objectData);
    }
    const button = createButton(objectData, onClick, "tbl");
    return button;
  }

  linksToButtonList = async (urlList) => {
    const buttonList = await Promise.all(urlList.map( (element) => {
      return this.linkToButton(element);
    }))
    return buttonList;
  }
  
  setLinksToButtons = async (tableEntry) => {
    if (isLink(tableEntry)) {
      const button = await this.linkToButton(tableEntry);
      return button;
    } else if (isListOfLinks(tableEntry)) {
      const buttonList = await this.linksToButtonList(tableEntry);
      return buttonList;
    } else {
      return tableEntry;
    }      
  }

  createTableOutput = () => {
    const selectionKeys = Object.keys(this.props.selection);
    const column1 = selectionKeys.map((string) => string.replace(/_/g," "));
    let column2;
    if (this.state.loading === true) {
      column2 = this.setLoadingText(this.state.column2)
    } else {
      column2 = this.state.column2;
    }
    const rows = column1.map((entry, i) => {
      return [column1[i], column2[i]]
    })
    const filteredRows = rows.filter((row) => {
      return (!["edited", "created", "url"].includes(row[0]))
    })
    const output = filteredRows.map((row, i) => {
      let column2Class = "caps";
      if (row[0] === "opening crawl") {
        column2Class = "noCaps";
      }      
      return (
      <tr key={row[0]}>
        <td className = "caps">{row[0]}</td>
        <td className = {column2Class}>{row[1]}</td>
      </tr>
      )        
    });
    return output;    
  }

  render() {
    return (
      <table>
        <tbody>
          {this.createTableOutput()}
        </tbody>
      </table>
    )       
  }
}

export default ShowProfile;