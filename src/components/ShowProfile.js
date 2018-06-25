import React from 'react';
import 'tachyons';

const ShowProfile = function (props) {
  const person = props.selectedPerson;
  if (person) {
    const entries = Object.entries(person)
    const tableOutput = entries.map((entry) => {
      return <tr className="stripe-dark" key={entry[0]}><td className="ttc">{entry[0]}</td><td className="ttc">{entry[1]}</td></tr>
    })
    return (
      <table className="center">
        <tbody>
          {tableOutput}
        </tbody>
      </table>
    )
  } else {
    return <div className="w-100 h-100 tc red">Select a person from the list</div>;
  }
}

export default ShowProfile;