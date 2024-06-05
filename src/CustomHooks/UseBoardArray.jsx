import {useRef} from 'react';
import {initialBoard} from '../utils/Constants.js';
export const UseBoardArray = () => {
  const boardArrayStorage = useRef(null);
  const moveNum = useRef(-1);

  const updateBoardArray = boardArray => {
    boardArrayStorage.current = boardArray;
    moveNum.current = -1;
  };

  const removeBoardArray = () => {
    boardArrayStorage.current = null;
    moveNum.current = -1;
  };
  const getNextBoard = () => {
    if (boardArrayStorage.current) {
      if (moveNum.current < boardArrayStorage.current.length - 1) {
        moveNum.current++;
      }
      return boardArrayStorage.current[moveNum.current];
    } else {
      return initialBoard;
    }
  };
  const getPreviousBoard = () => {
    if (boardArrayStorage.current) {
      if (moveNum.current <= 0) {
        moveNum.current = -1;
        return initialBoard;
      }
      if (moveNum.current > 0) {
        moveNum.current--;
        return boardArrayStorage.current[moveNum.current];
      }
    } else {
      return initialBoard;
    }
  };
  const getFirstBoard = () => {
    if (boardArrayStorage.current) {
      moveNum.current = -1;
    }
    return initialBoard;
  };
  const getLastBoard = () => {
    if (boardArrayStorage.current) {
      moveNum.current = boardArrayStorage.current.length - 1;
      return boardArrayStorage.current[moveNum.current];
    } else {
      return initialBoard;
    }
  };
  return {
    updateBoardArray,
    getNextBoard,
    getPreviousBoard,
    getFirstBoard,
    getLastBoard,
    removeBoardArray,
  };
};
