/* eslint-disable no-loop-func */
import isInBounds from "../HelperFunctions/IsInBounds";

//this function iterates from the kings location in all cardinal directions to check if there is a piece standing between it and an attacker. If so, the 'sandwiched' piece is 'pinned' (cannot move) except in the direction it is pinned, and its movement will not be calculated in calcSqsPerSide
const checkForAbsolutePin = (currentBoard, calcForWhite, recurseCallObj) => {
  var pinnedPieceArray = [];
  let kingIdToFind = calcForWhite ? "K1" : "k1";
  let kingIndex = null;

  //find the index of the king we are calculating for
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (currentBoard[i][j] === kingIdToFind) {
        kingIndex = [i, j];
      }
    }
  }

  const recurseFunction = (
    index,
    incrementY,
    incrementX,
    pieceisSandwiched,
    sandwichedPieceIndex,
    checkType,
    checkDirection
  ) => {
    var newIndex = [index[0] + incrementY, index[1] + incrementX];
    // var inBounds = isInBounds(newIndex[0], newIndex[1]);
    if (!isInBounds(newIndex[0], newIndex[1])) return;

    var newIndexValue = currentBoard[newIndex[0]][newIndex[1]];
    var newIndexHasPiece = newIndexValue !== 0;

    if (newIndexHasPiece) {
      let pieceSameColor =
        calcForWhite === (newIndexValue === newIndexValue.toUpperCase());
      if (pieceSameColor) {
        //If we find a piece of the same color, and there is already a piece in line with the king, return because there is no pin. Otherwise keep calculating, with the just-found piece the 'sandwiched' piece.
        if (!pieceisSandwiched) {
          recurseFunction(
            newIndex,
            incrementY,
            incrementX,
            true,
            newIndex,
            checkType,
            checkDirection
          );
        } else {
          return;
        }
      } else {
        //if piece on new index is of opposite color, stop calculating immediately if there is no sandwiched piece, because this means there is no pin
        if (pieceisSandwiched) {
          let conformedPieceType = newIndexValue[0].toUpperCase();
          let pieceIsPinning =
            conformedPieceType === checkType || conformedPieceType === "Q";
          if (pieceIsPinning) {
            //come back later and see if deep copy is necessary
            let recurseCallObjCopy = JSON.parse(JSON.stringify(recurseCallObj));
            for (var type in recurseCallObjCopy) {
              for (var direction in recurseCallObjCopy[type]) {
                if (direction !== checkDirection) {
                  // recurseCallObjCopy[type][direction] = [];
                  delete recurseCallObjCopy[type][direction];
                }
              }
            }
            let pinnedPieceObj = {
              pinnedPieceIndex: sandwichedPieceIndex,
              pinnedPieceCallObj: recurseCallObjCopy,
            };
            pinnedPieceArray.push(pinnedPieceObj);
            return;
          }
        }
      }
    } else {
      recurseFunction(
        newIndex,
        incrementY,
        incrementX,
        pieceisSandwiched,
        sandwichedPieceIndex,
        checkType,
        checkDirection
      );
    }
  };

  //iterate in all 8 directions
  for (var checkType in recurseCallObj) {
    for (var checkDirection in recurseCallObj[checkType]) {
      recurseCallObj[checkType][checkDirection].forEach((callIncrements) => {
        if (kingIndex) {
          recurseFunction(
            kingIndex,
            callIncrements[0],
            callIncrements[1],
            false,
            null,
            checkType,
            checkDirection
          );
        }
      });
    }
  }

  return pinnedPieceArray;
};

export default checkForAbsolutePin;
