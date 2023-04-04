import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ChessIcons from './ChessIcons.jsx';
import calcRedSqs from './calcRedSqs.jsx';
import calcBlueSqs from './calcBlueSqs.jsx';
import isWhiteSquare from './HelperFunctions/isWhiteSquare.jsx';
import indexToCoord from './HelperFunctions/indexToCoord.jsx';
import RenderInitialBoard from './RenderInitialBoard.jsx';
import RenderPieces from './RenderPieces.jsx';
import setPos from './HelperFunctions/setPos.jsx';

var globalBoard;
var globalwhiteSqCountBoard;
var globalBlackSqCountBoard;
var alwaysEmptyMatrix;
var alwaysInitialBoard;
var whiteCtrlOn = false;
var blackCtrlOn = false;
var currentHoverPosition;
var globalPieceObj;

const Visualizer = () => {

  // const setPos = (id) => {
  //   currentHoverPosition = id;
  // }
  // var globalBoard;
  const [pieceObj, setPieceObj] = useState({});
  const [initialRen, setInitialRen] = useState(true);

  var makePieceElements = () => {
    var pieceElementObj = {};
    let pieceArray = ['K', 'N', 'B', 'R', 'Q', 'P', 'k', 'n', 'b', 'r', 'q', 'p'];
    pieceArray.forEach(piece => {
      let pieceUrl = ChessIcons()[piece]
      for (var i = 1; i <= 9; i++) {
        let pieceString = `${piece}${i}`
        pieceElementObj[pieceString] =
        <img draggable='true' alt='' src={pieceUrl} width='50' height='50'
        onDragEnd={(e)=> {onDrop(e, pieceString)}}></img>
      }
    })
    // console.log('piecelementobj', pieceElementObj);
    setPieceObj(pieceElementObj);
    globalPieceObj = pieceElementObj;
    return pieceElementObj;
  }
  if (initialRen) {
      var boards = RenderInitialBoard();
      var positionArray = boards[1];
      var blankBoard = boards[0];
      var deepCopy = JSON.parse(JSON.stringify(positionArray));
      globalwhiteSqCountBoard = deepCopy;
      globalBoard = deepCopy;
      alwaysEmptyMatrix = JSON.parse(JSON.stringify(deepCopy));
      setInitialRen(false);
      makePieceElements();
      // renderBoard(positionArray, blankBoard)
    }

  const [chessBoard, setChessBoard] = useState(blankBoard);

  // useEffect(() => {
  //   // makePieceElements();
  //   // let pieceUrl = ChessIcons();
  // }, []);


  const renderBoard = (position, sqCtrl) => {
      var renderedBoard = chessBoard.map((square, currentIndex) => {
        var matrixIndex = indexToCoord(currentIndex);
        var row = matrixIndex[0];
        var column = matrixIndex[1];
        var color;

        var positionBoardPiece = position[row][column];
        var divInnerText;
        // console.log('renderboard pieceobj', pieceObj[positionBoardPiece])
        if (positionBoardPiece !== 0) {
          // divInnerText = b[positionBoardPiece];
          divInnerText = globalPieceObj[positionBoardPiece];

        }
       if (whiteCtrlOn && blackCtrlOn) {
        let indexColorSum = sqCtrl[row][column];
        if (indexColorSum !== 0) {
          if (indexColorSum > 0) {
            color = `redSquare${indexColorSum}`
          }
          if (indexColorSum < 0) {
            indexColorSum = indexColorSum * -1;
            color = `blueSquare${indexColorSum}`
          }
        } else {
          color = isWhiteSquare(matrixIndex);
        };
       } else {
         if (whiteCtrlOn) {
          let indexColorSum = sqCtrl[row][column];
          if (indexColorSum !== 0) {
            color = `redSquare${indexColorSum}`
          } else {
            color = isWhiteSquare(matrixIndex);
          };
        }
        if (blackCtrlOn) {
          let indexColorSum = sqCtrl[row][column];
          if (indexColorSum !== 0) {
            color = `blueSquare${indexColorSum}`
          } else {
            color = isWhiteSquare(matrixIndex);
          };
        }
        if (!whiteCtrlOn && !blackCtrlOn) {
        color = isWhiteSquare(matrixIndex);
        }
       }
      return (<div id={matrixIndex} className={color}
        onDragOver={()=> {setPos(matrixIndex)}}
        >{divInnerText}</div>
        );
      });

    globalBoard = JSON.parse(JSON.stringify(position));
    console.log('renderedboard', renderedBoard)
    setChessBoard(renderedBoard);
  }


  const movePiece = (id, piece) => {
    let slice = JSON.parse(JSON.stringify(globalBoard));
    console.log('globalboard', globalBoard)
    // let slice = chessBoard.map(piece => {
    //   return piece;
    // });

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
          var current = slice[i][j];
        if (current === piece) {
          slice[i][j] = 0;
        }
      }
    }
    slice[id[0]][id[1]] = piece;
    globalBoard = slice;
    var redSqBoard = calcRedSqs(id, piece, slice, alwaysEmptyMatrix);
    globalwhiteSqCountBoard = redSqBoard;
    var blueSqBoard = calcBlueSqs(id, piece, slice, alwaysEmptyMatrix);
    globalBlackSqCountBoard = blueSqBoard;

    preRenderBoard(slice, redSqBoard, blueSqBoard);
  }

  const preRenderBoard = (slice, redSqBoard, blueSqBoard) => {
    if (whiteCtrlOn && blackCtrlOn) {
      var totalBoard = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
        for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
            var redSum = redSqBoard[i][j];
            var blueSum = blueSqBoard[i][j];
            var totalSum = redSum - blueSum;
            totalBoard[i][j] = totalSum;
          }
        }
        renderBoard(slice, totalBoard);
      } else {
        if (whiteCtrlOn) {
          renderBoard(slice, redSqBoard);
        }
        if (blackCtrlOn) {
          renderBoard(slice, blueSqBoard);
        }
      }
      if (!whiteCtrlOn && !blackCtrlOn) {
        renderBoard(slice, alwaysEmptyMatrix);
      }
  }

  const onDrop = (e, piece) => {
    console.log('ondroppiece', piece);
    e.preventDefault();
    e.stopPropagation();
    movePiece(currentHoverPosition, piece);
  }

  // const setPos = (id) => {
  //   currentHoverPosition = id;
  // }

const setInitialBoardPosition = () => {

  var initialBoard = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
  var piecearray = ['r1', 'n1', 'b1', 'q1', 'k1', 'b2', 'n2', 'r2']
  var pawnarray = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
  var whitePieceArray = piecearray.map(piece => {
    return piece.toUpperCase();
  })
  var whitePawnArray = pawnarray.map(pawn => {
    return pawn.toUpperCase();
  })

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i === 0) {
        initialBoard[i][j] = piecearray[j];
      }
      if (i === 1) {
        initialBoard[i][j] = pawnarray[j];
      }
      if (i === 6) {
        initialBoard[i][j] = whitePawnArray[j];
      }
      if (i === 7) {
        initialBoard[i][j] = whitePieceArray[j];
      }
    }
  }
  alwaysInitialBoard = initialBoard;
  // console.log('always initial', alwaysInitialBoard)
  renderBoard(initialBoard, JSON.parse(JSON.stringify(alwaysEmptyMatrix)));
}

const reRenderBoard = (viewToToggle) => {
  let emptyMatrixCopy = JSON.parse(JSON.stringify(alwaysEmptyMatrix));

  if (viewToToggle === 'white') {
    whiteCtrlOn = !whiteCtrlOn
  } else {
    blackCtrlOn = !blackCtrlOn;
  }
  let blueSqBoard = calcBlueSqs(null, null, globalBoard, emptyMatrixCopy);
  let redSqBoard = calcRedSqs(null, null, globalBoard, emptyMatrixCopy)
  preRenderBoard(globalBoard, redSqBoard, blueSqBoard);
}


  return (
    <div className='bigDiv'>
      <div className='blackDiv'>
      {Object.keys(pieceObj).map((pieceId, index) => {
        return (
        <RenderPieces pieceId={pieceId} pieceElement={Object.entries(pieceObj)[index][1]}/>
        )
      })}
      </div>
    <div className='chessboard'>
      {/* {b.k} */}
      {chessBoard}


    <div className='whiteDiv'>

      {/* </div> */}
      <button onClick={() => {reRenderBoard('white')}} type="button">Show White Sq Ctrl</button>
      <button onClick={() => {reRenderBoard('black')}} type="button">Show Black Sq Ctrl</button>
      <button onClick={() => {setInitialBoardPosition()}} type="button">Set Initial Board Position</button>
      <button onClick={() => {renderBoard(alwaysEmptyMatrix, alwaysEmptyMatrix)}} type="button">Clear Board</button>
      {/* <button onClick={() => readPgn(pgnString)} type="button">Read PGN</button> */}
       </div>
  </div>
  </div>
  )
};

export default Visualizer;