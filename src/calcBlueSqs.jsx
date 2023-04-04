import React, { useState, useRef } from 'react';



const calcBlueSqs = (id, piece, positionBoard, alwaysEmptyMatrix) => {

  //ideas for making one single function,
  //pass in value to let know whether calculating for white or black
    //'calculating for white', a boolean
  //instead if if(found a piece), if (found a piece and color matches which color the func is running for)
    //if so, post vals or run recurse function
      //in recurse function, pass in color ur calculating for
      //everything in recurse function is the same

    //pawn ctrl;
    //if checking diagonals cuz ur a bishop/queen
    //if reach a piece and its a pawn, add the next index on that diagonal to the array before returning
      //for white diagonal -1, -1 and -1, 1
      //for black 1, -1 and 1, 1

        //if iswhite, on those function calls pass checkforpawns var
        //when reach a piece
          //if piece is same color, and a pawn, add next index to array

      //if bishop or queen on same diagonal as a pawn thats the same color (going from base to other side of the board)


    //absolute pins func
    //input: board, color calculating for,
    //before rending sq ctrl, must pass over the board to find the kings, then check for piece sandwich, if so,
      //if come across enemy piece, stop
        //if reach edge of board, stop

      //if reach same piece, keep going in that direction, if
      //if reach next piece found is not an enemy piece of specific pin type,
        //stop
    //log index of pinned piece, and
    //if statements will check if "q' && piecenotPinned
      //if piece is pinned its sq vals are not rendered

    //check diagonals for K, pieceofsamecolor, bishop/queen
    //and columns/rows,
    //just run recurse func?

  var kingSqVals = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var knightSqVals = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [-1, -2], [1, -2]];
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
        var bothSameColor = !isWhitePiece && !sqPieceIsWhite;
        // var bothSameColor = true;
        var samePieceType = sqPiece[0] === checkType || sqPiece === 'q';
        // console.log('samepiecetype', sqPiece, checkType, samePieceType);

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

    if (checkType === 'b') {
      recursiveFunc(index, -1, -1);
      recursiveFunc(index, 1, 1);
      recursiveFunc(index, -1, 1);
      recursiveFunc(index, 1, -1);
    }
    if (checkType === 'r') {
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


    let sliced = JSON.parse(JSON.stringify(alwaysEmptyMatrix));

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var sqValue = positionBoard[i][j];
        var isWhitePiece = (sqValue !== 0) && (sqValue.toUpperCase() === sqValue);
        // var isWhitePiece = true;

        //first check if piece is there, if so convert it to uppercase

        if (sqValue === 'k') {
          kingSqVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];
            var inBounds = isInBounds(rowIndex, columnIndex)

            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          })
        }

        if (sqValue[0] === 'n') {
          knightSqVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];

            var inBounds = isInBounds(rowIndex, columnIndex)
            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          });
        };

        if (sqValue[0] === 'p') {
          blackPawnVals.forEach(num => {
            var rowIndex = i + num[0]
            var columnIndex = j + num[1];

            var inBounds = isInBounds(rowIndex, columnIndex)
            if (inBounds) {
              sliced[rowIndex][columnIndex] += 1;
            }
          })
        }

        if (sqValue[0] === 'b') {
          let coordinates = [i, j];
          var diagonalArray = checkDiagonals(coordinates, 'b', isWhitePiece);
          diagonalArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })


        }
        if (sqValue[0] === 'r') {
          //later pass in color values
          let coordinates = [i, j];
          var rookArray = checkDiagonals(coordinates, 'r', isWhitePiece);
          rookArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
        }

        if (sqValue[0] === 'q') {
          //later pass in color values
          let coordinates = [i, j];
          let bishopArray = checkDiagonals(coordinates, 'b', isWhitePiece);
          bishopArray.forEach(square => {
            var row = square[0];
            var column = square[1];
            sliced[row][column] += 1;
          })
          let rookArray = checkDiagonals(coordinates, 'r', isWhitePiece);
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
    // console.log('sliced', sliced);
      return sliced;
  }

  export default calcBlueSqs;