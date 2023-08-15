import React from 'react';
import calcRedSqs from './calcRedSqs.jsx';
import RenderBoard from '../RenderBoard';

const CalcSqs = ({blackCtrlOn, whiteCtrlOn, currentBoard, pieceObj, alwaysEmptyMatrix, setPos, boardIsFlipped, sumMode, color1, color2, hexObj}) => {

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
    let whiteKingCoord;
    let blackKingCoord;

      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          let isWhiteKing = currentBoard[i][j] === 'K1';
          let isBlackKing = currentBoard[i][j] === 'k1';

          if (isWhiteKing) {
            whiteKingCoord = {i, j};
          } else if (isBlackKing) {
            blackKingCoord = {i, j};
          } else {

              var redSum = redSqBoard[i][j];
              var blueSum = blueSqBoard[i][j];
              var totalSum = redSum + blueSum;
              totalBoard[i][j] = totalSum;
              let hasWhitePiece = !!redSqBoardPiecePriority[i][j] && redSqBoardPiecePriority[i][j] !== 5;
              let hasBlackPiece = !!blueSqBoardPiecePriority[i][j] && blueSqBoardPiecePriority[i][j] !== 5;

              if (hasWhitePiece && blueSqBoardPriority[i][j] > redSqBoardPiecePriority[i][j]) {
                totalBoard[i][j] = blueSum
              }
              else if (hasBlackPiece && redSqBoardPriority[i][j] > blueSqBoardPiecePriority[i][j]) {
                totalBoard[i][j] = redSum
              }
          }
        }
      }
      if (whiteKingCoord && blackKingCoord) {

        let whiteKinginCheck = blueSqBoard[whiteKingCoord.i][whiteKingCoord.j] < 0;
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
       colorMatrix = redSqBoard
      }
      else if (blackCtrlOn) {
       colorMatrix = blueSqBoard
      }
      else if (!whiteCtrlOn && !blackCtrlOn) {
        colorMatrix = alwaysEmptyMatrix;
      }
    }

    return (<div class='flex place-content-center'>
      <RenderBoard currentBoard={currentBoard} pieceObj={pieceObj} colorMatrix={colorMatrix} setPos={setPos} boardIsFlipped={boardIsFlipped} color1={color1} color2={color2} hexObj={hexObj}/>
    </div>
    )
}

export default CalcSqs;

