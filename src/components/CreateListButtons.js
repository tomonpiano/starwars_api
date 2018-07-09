import React from 'react';

//should be component to allow for updates

const createButton = (object, handleClick) => {
  let name;
  if (object.name) {
    name = object.name;
  } else {
    name = object.title;
  }
  return (
    <button 
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
    <div className ="flexContainer halfWidth">
      {buttonList}
    </div>
  )
}

export {CreateListButtons, createButton};