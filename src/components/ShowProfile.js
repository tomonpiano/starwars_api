import React from 'react';

// const removeUS = function (_2darray) {
//   return _2darray.map((value) => [value[0].replace("_"," "), value[1]]);
// }

const isEmpty = function (query) {
  if (query.length === 0) {
    return true;
  }
}

const isLink = function (stringQuery) {
  if (stringQuery.slice(0,5) === "https") {
    return true;
  }
}

const isListOfLinks = function (query) {
  if (!isEmpty(query)) {
    if (isLink(query[0])) return true
  }
}

const getEntryLink = function (entry) {
  if (isEmpty(entry)) {
    return "None"
  } else if (isLink(entry)){
    return "url placeholder";  
  } else if (isListOfLinks(entry)){
    return "List of urls"
  } else {
    return entry
  }
}

const ShowProfile = function (props) {
  const person = props.selectedPerson;
  if (person) {
    const entries = Object.entries(person);    
    const tableOutput = entries.map((entry) => {
      return (
        <tr key={entry[0]}>
          <td>{entry[0].replace("_"," ")}</td>
          <td>{getEntryLink(entry[1])}</td>
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
  } else {
    return <div>Select a person from the list</div>;
  }
}

export default ShowProfile;