/* eslint-disable no-loop-func */
import React, { useState, useRef } from 'react';
import isInBounds from './HelperFunctions/isInBounds.jsx';

const checkForAbsolutePin = (currentBoard, calcForWhite, recurseCallObj) => {

  var pinnedPieceArray = [];
  let kingIdToFind = calcForWhite ? 'K1' : 'k1';
  let kingIndex = null;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (currentBoard[i][j] === kingIdToFind) {
        kingIndex = [i, j];
      }
    }
  }

  //iterate in all 8 directions
    const recurseFunction = (index, incrementY, incrementX, pieceisSandwiched, sandwichedPieceIndex, checkType, checkDirection) => {
      var newIndex = [index[0] + incrementY, index[1] + incrementX];
      var inBounds = isInBounds(newIndex[0], newIndex[1]);

      if (!inBounds) {
        return;
      }

      var newIndexValue = currentBoard[newIndex[0]][newIndex[1]];
      var newIndexHasPiece = newIndexValue !== 0;

      if (newIndexHasPiece) {
        let pieceSameColor = calcForWhite === (newIndexValue === newIndexValue.toUpperCase())
        if (pieceSameColor) {
          if (!pieceisSandwiched) {
            //piece is sandwiched, meaning a piece is inbetween path of king and recursive call
            recurseFunction(newIndex, incrementY, incrementX, true, newIndex, checkType, checkDirection);
          } else {
            return;
          }
        } else {
          //if piece on new index is of opposite color
          if (pieceisSandwiched) {
            let conformedPieceType = newIndexValue[0].toUpperCase();
            let pieceIsPinning = conformedPieceType === checkType || conformedPieceType === 'Q';
            if (pieceIsPinning) {
              let recurseCallObjCopy = JSON.parse(JSON.stringify(recurseCallObj));
              for (var type in recurseCallObjCopy) {
                for (var direction in recurseCallObjCopy[type]) {
                  if (direction !== checkDirection) {
                    recurseCallObjCopy[type][direction] = [];
                  }
                }
              }
              let pinnedPieceObj = {
                pinnedPieceIndex: sandwichedPieceIndex,
                pinnedPieceCallObj: recurseCallObjCopy
              }
              pinnedPieceArray.push(pinnedPieceObj)
              return;
            }
          }
        }
      } else {
        recurseFunction(newIndex, incrementY, incrementX, pieceisSandwiched, sandwichedPieceIndex, checkType, checkDirection)
      }
    }

    for (var checkType in recurseCallObj) {
      for (var checkDirection in recurseCallObj[checkType]) {
      recurseCallObj[checkType][checkDirection].forEach(callIncrements => {
        if (kingIndex) {
          recurseFunction(kingIndex, callIncrements[0], callIncrements[1], false, null, checkType, checkDirection)
        }
      })
      }
    }
    return pinnedPieceArray;
  }
export default checkForAbsolutePin;
