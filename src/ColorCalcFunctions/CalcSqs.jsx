import React from 'react';
import calcSqsPerSide from './CalcSqsPerSide';
import RenderBoard from '../Rendering/RenderBoard';

//this function calculates the colors on the board depending on if the switches for each color are turned on
const CalcSqs = ({
  blackCtrlOn,
  whiteCtrlOn,
  currentBoard,
  pieceObj,
  alwaysEmptyMatrix,
  setPos,
  boardIsFlipped,
  sumMode,
  boardElsMatrix,
  updateBoardEls,
  returnBoardEls,
}) => {
  var colorMatrix;
  let [redSqBoard, redSqBoardPriority, redSqBoardPiecePriority] =
    calcSqsPerSide(currentBoard, alwaysEmptyMatrix, true);
  let [blueSqBoard, blueSqBoardPriority, blueSqBoardPiecePriority] =
    calcSqsPerSide(currentBoard, alwaysEmptyMatrix, false);

  if (whiteCtrlOn && blackCtrlOn) {
    let totalBoard = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
    let whiteKingCoord;
    let blackKingCoord;

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        let isWhiteKing = currentBoard[i][j] === 'K1';
        let isBlackKing = currentBoard[i][j] === 'k1';
        if (isWhiteKing) whiteKingCoord = {i, j};
        if (isBlackKing) blackKingCoord = {i, j};

        let redSum = redSqBoard[i][j];
        let blueSum = blueSqBoard[i][j];
        totalBoard[i][j] = redSum + blueSum;

        let hasWhitePiece =
          !!redSqBoardPiecePriority[i][j] &&
          redSqBoardPiecePriority[i][j] !== 5;
        let hasBlackPiece =
          !!blueSqBoardPiecePriority[i][j] &&
          blueSqBoardPiecePriority[i][j] !== 5;
        //if a lower value pieces attacks a higher value piece (i.e. Knights attacks Queen), then the Queen's square is given the Knights color value. Since the queen (probably) has to move, the knight controls that square until the queen moves
        if (
          hasWhitePiece &&
          blueSqBoardPriority[i][j] > redSqBoardPiecePriority[i][j]
        ) {
          totalBoard[i][j] = blueSum;
        } else if (
          hasBlackPiece &&
          redSqBoardPriority[i][j] > blueSqBoardPiecePriority[i][j]
        ) {
          totalBoard[i][j] = redSum;
        }

        let protectedByWhitePawn = redSqBoardPriority[i][j] === 5;
        let isWhitePawn = redSqBoardPiecePriority[i][j] === 5;
        let isBlackPawn = blueSqBoardPiecePriority[i][j] === 5;

        let protectedByBlackPawn = blueSqBoardPriority[i][j] === 5;
        let squareHasNoPiece = currentBoard[i][j] === 0;

        if (
          (protectedByWhitePawn && squareHasNoPiece) ||
          (protectedByWhitePawn && isWhitePawn)
        ) {
          totalBoard[i][j] = Math.max(totalBoard[i][j], 1);
        }
        if (
          (protectedByBlackPawn && squareHasNoPiece) ||
          (protectedByBlackPawn && isBlackPawn)
        ) {
          totalBoard[i][j] = Math.min(totalBoard[i][j], -1);
        }
        if (protectedByWhitePawn && protectedByBlackPawn && squareHasNoPiece) {
          totalBoard[i][j] = 0;
        }
      }
    }

    if (whiteKingCoord && blackKingCoord) {
      //if a King is in check, the square colors for the side that is in check are disabled, for better Mating Net illustrations
      //this is wrapped in an if statement so the calculation is not done if there are no kings on the board
      let whiteKinginCheck =
        blueSqBoard[whiteKingCoord.i][whiteKingCoord.j] < 0;
      let blackKinginCheck = redSqBoard[blackKingCoord.i][blackKingCoord.j] > 0;
      if (whiteKinginCheck) {
        colorMatrix = blueSqBoard;
      } else if (blackKinginCheck) {
        colorMatrix = redSqBoard;
      } else {
        colorMatrix = totalBoard;
      }
    } else {
      colorMatrix = totalBoard;
    }
  } else {
    if (whiteCtrlOn) {
      colorMatrix = redSqBoard;
    } else if (blackCtrlOn) {
      colorMatrix = blueSqBoard;
    } else if (!whiteCtrlOn && !blackCtrlOn) {
      colorMatrix = alwaysEmptyMatrix;
    }
  }
  return (
    <div className="flex place-content-center">
      <RenderBoard
        currentBoard={currentBoard}
        pieceObj={pieceObj}
        colorMatrix={colorMatrix}
        setPos={setPos}
        boardIsFlipped={boardIsFlipped}
        boardElsMatrix={boardElsMatrix}
        updateBoardEls={updateBoardEls}
        returnBoardEls={returnBoardEls}
      />
    </div>
  );
};

export default CalcSqs;
