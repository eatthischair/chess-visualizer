import React, { useState, useRef } from 'react';

// import isInBounds from './HelperFunctions/isInBounds.jsx';
// console.log('isinbounds', isInBounds);


const calcRedSqs = (id, piece, positionBoard, alwaysEmptyMatrix, calcForWhite) => {

  //later code an iscompatible, which for each piece shows what it is compatible with in what direction
    //will need to know piece color, piece type, and if loop if rook or bishop way

  var kingSqVals = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var knightSqVals = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [-1, -2], [1, -2]];
  var whitePawnVals = [[-1, -1], [-1, 1]];
  var blackPawnVals = [[1, -1], [1, 1]];

  const checkDiagonals = (index, checkType, isWhitePiece) => {
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

        // var sqPieceIsWhite = true;
        var bothSameColor = isWhitePiece && sqPieceIsWhite;
        // var bothSameColor = true;

        var samePieceType = sqPiece[0] === checkType || sqPiece === 'Q';
        console.log('samepiecetype', sqPiece, checkType, samePieceType);

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

    if (checkType === 'B') {
      recursiveFunc(index, -1, -1);
      recursiveFunc(index, 1, 1);
      recursiveFunc(index, -1, 1);
      recursiveFunc(index, 1, -1);
    }
    if (checkType === 'R') {
      recursiveFunc(index, 0, -1);
      recursiveFunc(index, 0, 1);
      recursiveFunc(index, -1, 0);
      recursiveFunc(index, 1, 0);
    }

    return bigArray;
    //return array of indexes
  }

  const isInBounds = (rowIndex, columnIndex) => {
    var rowInBounds = rowIndex >= 0 && rowIndex <= 7;
    var columnInBounds = columnIndex >= 0 && columnIndex <= 7;
    if (rowInBounds && columnInBounds) {
      return true;
    } else {
      return false;
    }
  }
    //must reset redSq ctrl and recalculate every render
    let sliced = JSON.parse(JSON.stringify(alwaysEmptyMatrix));

    //update sq ctrl vals for each piece
    //loop over position board
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var sqValue = positionBoard[i][j];
        var isWhitePiece = (sqValue !== 0) && (sqValue.toUpperCase() === sqValue);
        // var isWhitePiece = true;
        //first check if piece is there, if so convert it to uppercase

        if (sqValue === 'K') {
          kingSqVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];
            var inBounds = isInBounds(rowIndex, columnIndex)

            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          })
        }
        if (sqValue[0] === 'N') {
          knightSqVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];

            var inBounds = isInBounds(rowIndex, columnIndex)
            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          });
        };

        if (sqValue[0] === 'P') {
          whitePawnVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];

            var inBounds = isInBounds(rowIndex, columnIndex)
            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          })
        }

        if (sqValue[0] === 'B') {
          let coordinates = [i, j];
          var diagonalArray = checkDiagonals(coordinates, 'B', isWhitePiece);
          diagonalArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
          //call maj diag func at sqCtrl, position board
          //call minor diag func

        }
        if (sqValue[0] === 'R') {
          //later pass in color values
          let coordinates = [i, j];
          var rookArray = checkDiagonals(coordinates, 'R', isWhitePiece);
          rookArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
          //call maj diag func at sqCtrl, position board
          //call minor diag func

        }
        if (sqValue[0] === 'Q') {
          //later pass in color values
          let coordinates = [i, j];
          let bishopArray = checkDiagonals(coordinates, 'B', isWhitePiece);
          bishopArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
          let rookArray = checkDiagonals(coordinates, 'R', isWhitePiece);
          rookArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
          //call maj diag func at sqCtrl, position board
          //call minor diag func

        }

      }
    }
    // setWhiteSqCtrlBoard(JSON.parse(JSON.stringify(sliced)));
    console.log('sliced', sliced);
      return sliced;
  }

  export default calcRedSqs;