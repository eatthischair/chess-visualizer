import React, {useState} from 'react';
import Visualizer from '../Visualizer.jsx';
import {initialBoard} from '../utils/Constants.js';
import {MyContext} from './Context.jsx';

//mouse position
var currentHoverPosition;
export const setPos = id => {
  currentHoverPosition = id;
};
export const getPos = () => {
  return currentHoverPosition;
};

//for displaying and storing games
var pgnBoardArray;
const updatePgnBoardArray = array => {
  pgnBoardArray = array;
};

var moveNum = -1;
export const resetMoveNum = () => {
  moveNum = -1;
};

//keyboard event listener functions
export const getNextBoard = () => {
  if (pgnBoardArray) {
    if (moveNum < pgnBoardArray.length - 1) {
      moveNum++;
    }
    return pgnBoardArray[moveNum];
  } else {
    //error handling
    return initialBoard;
  }
};

export const getPreviousBoard = () => {
  if (pgnBoardArray) {
    if (moveNum <= -1) {
      moveNum++;
    }
    if (moveNum === 0) {
      moveNum--;
      return initialBoard;
    }
    if (moveNum > 0) {
      moveNum--;
      return pgnBoardArray[moveNum];
    }
  } else {
    //error handling
    return initialBoard;
  }
};
export const getFirstBoard = () => {
  if (pgnBoardArray) {
    moveNum = -1;
  }
  return initialBoard;
};
export const getLastBoard = () => {
  if (pgnBoardArray) {
    moveNum = pgnBoardArray.length - 1;
    return pgnBoardArray[moveNum];
  }
};

export const State = () => {
  // const [pgnBoardArray, setPgnBoardArray] = useState(null);

  return (
    <div>
      <Visualizer
        pgnBoardArray={pgnBoardArray}
        // setPgnBoardArray={setPgnBoardArray}
        updatePgnBoardArray={updatePgnBoardArray}
        resetMoveNum={resetMoveNum}
      />
    </div>
  );
};
