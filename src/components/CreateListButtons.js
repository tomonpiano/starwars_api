import React from 'react';
import 'tachyons';

//should be class so handleClick is not rerendered every time

const CreateListButtons = function (props) {
    const buttonList = props.list.map((element, i) => {
      const handleClick = () => props.handleClick(i)
      return (
        <button
          key={i}
          className="pa2 w-50 ba br-pill bw1 bg-purple white dim grow shadow-2"
          onClick={handleClick}>
            {element.name}
        </button>
      )
    });
    return (
      <div className="flex flex-column items-center">
        {buttonList}
      </div>
      //buttonList
    )
  }

export default CreateListButtons;