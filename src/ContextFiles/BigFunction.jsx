import React, {useState} from 'react';
import Visualizer from '../Visualizer.jsx';
import {initialBoard} from '../MakeElements/SetInitialBoard.js';
import {MyContext} from './Context.jsx';

const BigFunction = cookies => {
  var currentHoverPosition;
  //mouse position
  const setPos = id => {
    // console.log('setPos', id);
    currentHoverPosition = id;
    return currentHoverPosition;
  };
  const getPos = () => {
    return currentHoverPosition;
  };

  var globalBoard = initialBoard;

  const updateGlobalBoard = newBoard => {
    globalBoard = newBoard;
    return globalBoard;
  };
  const getGlobalBoard = () => {
    return globalBoard;
  };

  var alwaysInitialBoard = initialBoard;

  //for displaying and storing games

  var pgnBoardArray;

  const updatePgnBoardArray = array => {
    pgnBoardArray = array;
  };

  var moveNum = -1;
  const resetMoveNum = () => {
    moveNum = -1;
  };

  const getNextBoard = () => {
    if (pgnBoardArray) {
      if (moveNum < pgnBoardArray.length - 1) {
        moveNum++;
      }
      updateGlobalBoard(pgnBoardArray[moveNum]);
      return pgnBoardArray[moveNum];
    } else {
      return alwaysInitialBoard;
    }
  };

  const getPreviousBoard = () => {
    if (pgnBoardArray) {
      if (moveNum <= -1) {
        moveNum++;
      }
      if (moveNum === 0) {
        moveNum--;
        updateGlobalBoard(alwaysInitialBoard);
        return alwaysInitialBoard;
      }
      if (moveNum > 0) {
        moveNum--;
        updateGlobalBoard(pgnBoardArray[moveNum]);
        return pgnBoardArray[moveNum];
      }
    } else {
      return alwaysInitialBoard;
    }
  };
  const getFirstBoard = () => {
    if (pgnBoardArray) {
      moveNum = -1;
    }
    return alwaysInitialBoard;
  };
  const getLastBoard = () => {
    if (pgnBoardArray) {
      moveNum = pgnBoardArray.length - 1;
      return pgnBoardArray[moveNum];
    }
  };

  let boardElsMatrix;
  const updateBoardEls = newMatrix => {
    boardElsMatrix = newMatrix;
  };
  const returnBoardEls = () => {
    return boardElsMatrix;
  };

  return (
    <div>
      <div>
        <Visualizer
          setPos={setPos}
          currentHoverPosition={currentHoverPosition}
          getPos={getPos}
          updateGlobalBoard={updateGlobalBoard}
          getGlobalBoard={getGlobalBoard}
          updatePgnBoardArray={updatePgnBoardArray}
          getNextBoard={getNextBoard}
          getPreviousBoard={getPreviousBoard}
          resetMoveNum={resetMoveNum}
          getFirstBoard={getFirstBoard}
          getLastBoard={getLastBoard}
          boardElsMatrix={boardElsMatrix}
          updateBoardEls={updateBoardEls}
          returnBoardEls={returnBoardEls}
        />
      </div>
    </div>
  );
};

export default BigFunction;
