import React, {useReducer} from 'react';
import {initialBoard} from '../utils/Constants.js';
export const initialState = {
  pgnBoardArray: [],
  moveNum: -1,
  initialBoard: initialBoard,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PGN_BOARD_ARRAY':
      console.log('updatepgn', state, action);
      // state.pgnBoardArray = action.payload;
      return {...state, pgnBoardArray: action.payload};
    case 'RESET_MOVE_NUM':
      return {...state, moveNum: -1};
    case 'GET_NEXT_BOARD':
      console.log('stateee', state, action);
      if (state.pgnBoardArray) {
        const newMoveNum =
          state.moveNum < state.pgnBoardArray.length - 1
            ? state.moveNum + 1
            : state.moveNum;
        return {
          ...state,
          moveNum: newMoveNum,
          currentBoard: state.pgnBoardArray[newMoveNum] || state.initialBoard,
        };
      } else {
        return {
          ...state,
          currentBoard: state.initialBoard,
        };
      }
    default:
      return state;
  }
};
