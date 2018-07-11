import React from 'react';

//should be component to allow for updates

const createButton = (object, handleClick, className) => {
  // do we need this anymore? handled in App
  let name;
  if (object.name) {
    name = object.name;
  } else {
    name = object.title;
  }
  return (
    <button
      className = {className}
      key={name}
      onClick={handleClick}>
      {name}
    </button>
  )
}

const CreateListButtons = (objectList, handleClick) => {
  const buttonList = objectList.map((element, i) => {
    const onClick = () => handleClick(element, i)
    return (
      createButton(element, onClick)
    )
  });
  return (
    <div className = "mw900">
      {buttonList}
    </div>
  )
}

export {CreateListButtons, createButton};