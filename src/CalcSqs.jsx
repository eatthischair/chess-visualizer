import React, { useState, useRef, useEffect } from 'react';
import calcRedSqs from './calcRedSqs.jsx';
import RenderBoard from './RenderBoard.jsx';
import calcPriority from './calcPriority.js';

const CalcSqs = ({blackCtrlOn, whiteCtrlOn, currentBoard, pieceObj, alwaysEmptyMatrix, setPos, boardIsFlipped}) => {

  var colorMatrix;
  var redSqBoardAll = calcRedSqs(currentBoard, alwaysEmptyMatrix, true);
  var redSqBoard = redSqBoardAll[0];
  var redSqBoardPriority = redSqBoardAll[1];
  var redSqBoardPiecePriority = redSqBoardAll[2]
  var blueSqBoardAll = calcRedSqs(currentBoard, alwaysEmptyMatrix, false);
  var blueSqBoard = blueSqBoardAll[0];
  var blueSqBoardPriority = blueSqBoardAll[1];
  var blueSqBoardPiecePriority = blueSqBoardAll[2];

  if (whiteCtrlOn && blackCtrlOn) {
    let totalBoard = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
    let priorityBoard = JSON.parse(JSON.stringify(alwaysEmptyMatrix));

      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          var redSum = redSqBoard[i][j];
          var blueSum = blueSqBoard[i][j];
          var totalSum = redSum + blueSum;
          totalBoard[i][j] = totalSum;

          let hasWhitePiece = !!redSqBoardPiecePriority[i][j] && redSqBoardPiecePriority[i][j]!== 5;
          let hasBlackPiece = !!blueSqBoardPiecePriority[i][j] && blueSqBoardPiecePriority[i][j] !== 5;
          if (hasWhitePiece) {
            blueSqBoardPriority[i][j] > redSqBoardPiecePriority[i][j] ? priorityBoard[i][j] = blueSqBoardPriority[i][j] * -1 : priorityBoard[i][j] = redSqBoardPiecePriority[i][j]
          }
          else if (hasBlackPiece) {
            redSqBoardPriority[i][j] > blueSqBoardPiecePriority[i][j] ? priorityBoard[i][j] = redSqBoardPriority[i][j] : priorityBoard[i][j] = blueSqBoardPiecePriority[i][j] * -1
          }
          else if (blueSqBoardPriority[i][j] === redSqBoardPriority[i][j]) {
              priorityBoard[i][j] = 0;
          } else {
            redSqBoardPriority[i][j] > blueSqBoardPriority[i][j] ? priorityBoard[i][j] = redSqBoardPriority[i][j] : priorityBoard[i][j] = blueSqBoardPriority[i][j] * -1
          }
        }
      }
      // console.log('priorityboard', priorityBoard)
      // colorMatrix = totalBoard;
      colorMatrix = priorityBoard;
    } else {
      if (whiteCtrlOn) {
        colorMatrix = redSqBoard;
      }
      else if (blackCtrlOn) {
        colorMatrix = blueSqBoard;
      }
      else if (!whiteCtrlOn && !blackCtrlOn) {
        colorMatrix = alwaysEmptyMatrix;
      }
    }
    return (<div class='flex place-content-center'>
      <RenderBoard currentBoard={currentBoard} pieceObj={pieceObj} colorMatrix={colorMatrix} setPos={setPos} boardIsFlipped={boardIsFlipped}/>
    </div>
    )
}

export default CalcSqs;

