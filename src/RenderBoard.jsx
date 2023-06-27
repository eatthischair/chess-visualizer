import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import isWhiteSquare from './HelperFunctions/isWhiteSquare.jsx';
import indexToCoord from './HelperFunctions/indexToCoord.jsx';
import './App.css';

const RenderBoard = ({currentBoard, pieceObj, colorMatrix, setPos, boardIsFlipped, color}) => {
  console.log('COLOR FROM PAGE', color.hex, typeof color.hex)
  let chessBoard = []
  for (var i = 0; i < 64; i++) {
    chessBoard.push(0);
  }
  var aaaa = color.hex;

  var renderedBoard = chessBoard.map((square, currentIndex) => {
    var matrixIndex = indexToCoord(currentIndex);
    var row = matrixIndex[0];
    var column = matrixIndex[1];
    var color;
    var positionBoardPiece = currentBoard[row][column];
    var piece;
    let colorSum = colorMatrix[row][column];

    if (positionBoardPiece !== 0) {
      piece = pieceObj[positionBoardPiece];
    }
    if (colorSum !== 0) {
      color *= 1;
      if (colorSum > 0) {
        color = `redSquare${colorSum}`
      }
      if (colorSum < 0) {
        colorSum = colorSum * -1;
        color = `blueSquare${colorSum}`
      }
    } else {
      color = isWhiteSquare(matrixIndex);
    }

    let isWhite = ((row * 1) % 2 === 0) === ((column * 1) % 2 === 0);
    let eee;
    if (isWhite) {
      eee = '#ffffff';
    } else {
      eee = aaaa;
    }

    return (<div style={{backgroundColor: eee}} id={matrixIndex} className={color}
      onDragOver={()=> {setPos(matrixIndex)}}
      >{piece}</div>
      );
    });

    if (boardIsFlipped) {
      renderedBoard = renderedBoard.reverse();
    }

  return (
    <div class='flex place-content-center'>
      <div className="chessboard ">{renderedBoard}</div>
    </div>
  )
  }
export default RenderBoard;