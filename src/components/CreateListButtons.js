import React from 'react';

//should be class so handleClick is not rerendered every time

const CreateListButtons = function (props) {
    const buttonList = props.list.map((element, i) => {
      const handleClick = () => props.handleClick(i)
      return (
        <button
          key={i}
          onClick={handleClick}>
            {element.name}
        </button>
      )
    });
    return (
      <div className ="flexContainer">
        {buttonList}
      </div>
      //buttonList
    )
  }

export default CreateListButtons;