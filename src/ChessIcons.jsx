import React, { useState, useRef } from 'react';

const ChessIcons = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log('dragstart', e.target, dragItem);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log('drag enter', e.target, dragOverItem);
  };

  const logPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('eeeeE', e.target);
  }
  var chessPiecesObj = {};
  chessPiecesObj['K'] = <img  draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png' width='50' height='50'

  onDragEnd={(e)=> {logPos(e)}}></img>;

return (
{chessPiecesObj}
)
}


export default ChessIcons;