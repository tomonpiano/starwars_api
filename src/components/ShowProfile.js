import React from 'react';

const ShowProfile = function (props) {
  const person = props.selectedPerson;
  if (person) {
    const entries = Object.entries(person)
    const tableOutput = entries.map((entry) => {
      return <tr key={entry[0]}><td>{entry[0]}</td><td>{entry[1]}</td></tr>
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