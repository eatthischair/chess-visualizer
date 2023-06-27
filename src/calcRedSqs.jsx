/* eslint-disable no-loop-func */
import React, { useState, useRef } from 'react';
import isInBounds from './HelperFunctions/isInBounds.jsx';
import checkForAbsolutePin from './checkForAbsolutePin.jsx';

const calcRedSqs = (positionBoard, alwaysEmptyMatrix, calcForWhite) => {

  var kingSqVals = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var knightSqVals = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [-1, -2], [1, -2]];
  var whitePawnVals = [[-1, -1], [-1, 1]];
  var blackPawnVals = [[1, 1], [1, -1]];
  var pawnVals;

  if (calcForWhite) {
    pawnVals = whitePawnVals
  } else {
    pawnVals = blackPawnVals;
  }

  var recurseCallObj = {
  B: {
    NE: [[1, -1], [-1, 1]],
    NW: [[1, 1], [-1, -1]],
  },
  R: {
    N:[[1, 0], [-1, 0]],
    W:[[0, -1], [0, 1]],
  },
  P: {
    NW: pawnVals[0],
    NE: pawnVals[1]
  }
 };


  let pinnedPieceArray = checkForAbsolutePin(positionBoard, calcForWhite, recurseCallObj);

  const checkDiagonals = (index, checkType, isWhitePiece, callObj) => {
    var bigArray = [];
    const recursiveFunc = (index, incrementX, incrementY) => {
      var row = index[0];
      var newRow = row + incrementX
      var column = index[1];
      var newColumn = column + incrementY;
      var inBounds = isInBounds(newRow, newColumn);
      var newIndex = [newRow, newColumn];
      if (!inBounds) {
        return;
      }
      var sqPiece = positionBoard[newRow][newColumn];
      var sqHasPiece = sqPiece !== 0;
      if (sqHasPiece) {
        var sqPieceIsWhite = positionBoard[newRow][newColumn] === positionBoard[newRow][newColumn].toUpperCase();
        sqPiece = sqPiece.toUpperCase();
        var bothSameColor = isWhitePiece === sqPieceIsWhite;
        var samePieceType = sqPiece[0] === checkType || sqPiece[0] === 'Q';

        var pawnBattery = checkType === 'B' && sqPiece[0] === 'P';
        if (pawnBattery && bothSameColor) {
          let pawnBatteryIndex = [newRow + incrementX, newColumn + incrementY];
          bigArray.push(pawnBatteryIndex);
        }
        if (samePieceType && bothSameColor) {
          bigArray.push(newIndex);
          recursiveFunc(newIndex, incrementX, incrementY);
        } else {
          bigArray.push(newIndex);
          return;
        };
      } else {
        bigArray.push(newIndex)
        recursiveFunc(newIndex, incrementX, incrementY);
      }
    }

    for (var key in callObj) {
      let callIncrementsArray = callObj[key];
      if (callIncrementsArray.length !== 0) {
        callIncrementsArray.forEach(callIncrement => {
            recursiveFunc(index, callIncrement[0], callIncrement[1])
          })
        };
      }
    return bigArray;
  }

    let sliced = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
    let sliced2 = JSON.parse(JSON.stringify(alwaysEmptyMatrix))
    let sliced3 = JSON.parse(JSON.stringify(alwaysEmptyMatrix));


    const updateCallObjandPinStatus = (pinnedPieceArray, callObj, i, j) => {
      let pinned = false;
      pinnedPieceArray.forEach(item => {
        if (item.pinnedPieceIndex[0] === i && item.pinnedPieceIndex[1] === j) {
          callObj = item.pinnedPieceCallObj;
          pinned = true;
          };
        });
        return [callObj, pinned];
    }

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var sqValue = positionBoard[i][j];
        let update = updateCallObjandPinStatus(pinnedPieceArray, recurseCallObj, i, j);
        let callObj = update[0]
        let pinned = update[1];
        if (pinned) {
          // console.log('call obj', callObj)
        }

        var isWhitePiece = (sqValue !== 0) && (sqValue.toUpperCase() === sqValue);
        if (sqValue !== 0) {
          sqValue = sqValue.toUpperCase();
        }
        var correctPieceColor = calcForWhite === isWhitePiece;

        if (correctPieceColor) {
          if (sqValue[0] === 'K') {
            sliced3[i][j] = 1;
            kingSqVals.forEach(num => {
              var rowIndex = i + num[0]
              var columnIndex = j + num[1];
              var inBounds = isInBounds(rowIndex, columnIndex)
              if (inBounds) {
                sliced[rowIndex][columnIndex] += 1;
                // sliced2[rowIndex][columnIndex] += '1'
                sliced2[rowIndex][columnIndex] = Math.max(sliced2[rowIndex][columnIndex], 1)

              }
            })
          }
          if (sqValue[0] === 'N') {
            sliced3[i][j] = 4;
            if (!pinned) {
              knightSqVals.forEach(num => {
                var rowIndex = i + num[0]
                var columnIndex = j + num[1];
                var inBounds = isInBounds(rowIndex, columnIndex)
                if (inBounds) {
                  sliced[rowIndex][columnIndex] += 1;
                  // sliced2[rowIndex][columnIndex] += '4'
                  sliced2[rowIndex][columnIndex] = Math.max(sliced2[rowIndex][columnIndex], 4)
                }
              });
            }
          }
          if (sqValue[0] === 'P') {
            sliced3[i][j] = 5;
            for (var key in callObj.P) {
              let incrementArray = callObj.P[key];
              if (incrementArray.length !== 0) {
                var rowIndex = i + incrementArray[0];
                var columnIndex = j + incrementArray[1];
                var inBounds = isInBounds(rowIndex, columnIndex)
                if (inBounds) {
                  sliced[rowIndex][columnIndex] += 1;
                  // sliced2[rowIndex][columnIndex] += '5'
                  sliced2[rowIndex][columnIndex] = Math.max(sliced2[rowIndex][columnIndex], 5)
                }
              }
            }
          }
          if (sqValue[0] === 'B') {
            sliced3[i][j] = 4;
            let coordinates = [i, j];
            var diagonalArray = checkDiagonals(coordinates, 'B', isWhitePiece, callObj.B);
            diagonalArray.forEach(square => {
              var row = square[0];
              var column = square[1];
              sliced[row][column] += 1;
              // sliced2[row][column] += '4'
              sliced2[row][column] = Math.max(sliced2[row][column], 4)

            })
          }
          if (sqValue[0] === 'R') {
            sliced3[i][j] = 3;
            let coordinates = [i, j];
            var rookArray = checkDiagonals(coordinates, 'R', isWhitePiece, callObj.R);
            rookArray.forEach(square => {
              var row = square[0];
              var column = square[1];
              sliced[row][column] += 1;
              // sliced2[row][column] += '3'
              sliced2[row][column] = Math.max(sliced2[row][column], 3)

            })
          }
          if (sqValue[0] === 'Q') {
            sliced3[i][j] = 2;
            let coordinates = [i, j];
            let bishopArray = checkDiagonals(coordinates, 'B', isWhitePiece, callObj.B);
            bishopArray.forEach(square => {
              var row = square[0];
              var column = square[1];
              sliced[row][column] += 1;
              // sliced2[row][column] += '2'
              sliced2[row][column] = Math.max(sliced2[row][column], 2)

            })
            let rookArray = checkDiagonals(coordinates, 'R', isWhitePiece, callObj.R);
            rookArray.forEach(square => {
              var row = square[0];
              var column = square[1];
              sliced[row][column] += 1;
              // sliced2[row][column] += '2'
              sliced2[row][column] = Math.max(sliced2[row][column], 2)
            })
          }
        }
      }
    };

    if (!calcForWhite) {
      sliced.forEach((row, rowIndex) => {
        row.forEach((square, columnIndex) => {
          sliced[rowIndex][columnIndex] = square * -1;
        })
      })
    }

    // console.log('sliced3', sliced2, sliced3);

    return [sliced, sliced2, sliced3];
  }

  export default calcRedSqs;