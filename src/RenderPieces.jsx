import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const RenderPieces = ({currentBoard, pieceId, pieceElement}) => {
// console.log('currentboard', pieceId)

let pieceOnBoard = false;
for (var i = 0; i < currentBoard.length; i++) {
  // console.log('ee', pieceId.slice(1) ==='10', pieceId[1])
  if (pieceId.slice(1) === '64') {
    // if (currentBoard[i].indexOf(pieceId) !== -1) {
    //  pieceOnBoard = true;
    // }
    // if (!pieceOnBoard) {
      return pieceElement
    // }
   }
  }
// return pieceElement;
}

export default RenderPieces;