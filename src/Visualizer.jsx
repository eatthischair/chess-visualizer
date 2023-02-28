import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ChessIcons from './ChessIcons.jsx';
import calcRedSqs from './calcRedSqs.jsx';
import calcBlueSqs from './calcBlueSqs.jsx';

var currentHoverPosition;
var globalBoard;
var globalwhiteSqCountBoard;
var globalBlackSqCountBoard;
var alwaysEmptyMatrix;
var whiteCtrlOn = false;
var blackCtrlOn = false;

const Visualizer = () => {

  const isWhiteSquare = (coords) => {
    if ((coords[0] + coords[1]) % 2 === 0) {
      return 'whiteSquare';
    } else {
      return 'blackSquare';
    }
  };

  const indexToCoord = (index) => {
      var remainder = index % 8;
      var multiple = (index - remainder) / 8;
      return [multiple, remainder]
    }

  const [initialRen, setInitialRen] = useState(true);

  if (initialRen) {
    var blankBoard = [];
    var positionArray = [];
    for (var i = 0; i < 8; i++) {
      var pieceArray = [];
      for (var j = 0; j < 8; j++) {
        let id = [i, j]
        var color = isWhiteSquare(id);
        blankBoard.push(<div id={id} className={color}
          onDragOver={()=> {setPos(id)}}
          ></div>)
          pieceArray.push(0);
        }
        positionArray.push(pieceArray);

      };
      //initialize empty boards
      globalBoard = positionArray;
      var deepCopy = JSON.parse(JSON.stringify(positionArray));
      globalwhiteSqCountBoard = deepCopy;
      alwaysEmptyMatrix = JSON.parse(JSON.stringify(deepCopy));

      setInitialRen(false);
    }

   const [chessBoard, setChessBoard] = useState(blankBoard);

  const renderBoard = (position, sqCtrl) => {

      var renderedBoard = chessBoard.map((square, currentIndex) => {
        var matrixIndex = indexToCoord(currentIndex);
        var row = matrixIndex[0];
        var column = matrixIndex[1];
        var color;

        var positionBoardpiece = position[row][column];
        var divInnerText;
        if (positionBoardpiece !== 0) {
          divInnerText = b[positionBoardpiece];
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
    setChessBoard(renderedBoard);
  }


  const movePiece = (id, piece) => {
    let slice = JSON.parse(JSON.stringify(globalBoard));
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
    e.preventDefault();
    e.stopPropagation();
    movePiece(currentHoverPosition, piece);
  }

  const setPos = (id) => {
    currentHoverPosition = id;
  }

  var b = {};
  //white pieces
  b['K'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'K')}}></img>;

  b['N1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'N1')}}></img>;

  b['N2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'N2')}}></img>;

  b['B1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png?20220728152456' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'B1')}}></img>;

  b['B2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png?20220728152456' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'B2')}}></img>;

  b['R1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'R1')}}></img>;

  b['R2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'R2')}}></img>;

  b['Q'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'Q')}}></img>;

  b['P1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P1')}}></img>;

  b['P2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P2')}}></img>;

  b['P3'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P3')}}></img>;

  b['P4'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P4')}}></img>;

  b['P5'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P5')}}></img>;

  b['P6'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P6')}}></img>;

  b['P7'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P7')}}></img>;

  b['P8'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'P8')}}></img>;

  //black pieces
  b['k'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'k')}}></img>;

  b['n1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'n1')}}></img>;

  b['n2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'n2')}}></img>;

  b['b1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'b1')}}></img>;

  b['b2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'b2')}}></img>;

  b['r1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'r1')}}></img>;

  b['r2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'r2')}}></img>;

  b['q'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'q')}}></img>;

  b['p1'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p1')}}></img>;

  b['p2'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p2')}}></img>;

  b['p3'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p3')}}></img>;

  b['p4'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p4')}}></img>;

  b['p5'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p5')}}></img>;

  b['p6'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p6')}}></img>;

  b['p7'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p7')}}></img>;

  b['p8'] = <img draggable='true' alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png' width='50' height='50'
  onDragEnd={(e)=> {onDrop(e, 'p8')}}></img>;

const setInitialBoardPosition = () => {

  var emptyMatrixCopy = JSON.parse(JSON.stringify(alwaysEmptyMatrix));
  var piecearray = ['r1', 'n1', 'b1', 'q', 'k', 'b2', 'n2', 'r2']
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
        emptyMatrixCopy[i][j] = piecearray[j];
      }
      if (i === 1) {
        emptyMatrixCopy[i][j] = pawnarray[j];
      }
      if (i === 6) {
        emptyMatrixCopy[i][j] = whitePawnArray[j];
      }
      if (i === 7) {
        emptyMatrixCopy[i][j] = whitePieceArray[j];
      }
    }
  }
  renderBoard(emptyMatrixCopy, JSON.parse(JSON.stringify(alwaysEmptyMatrix)));
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
      {b.k}
      {b.n1}
      {b.n2}
      {b.b1}
      {b.b2}
      {b.r1}
      {b.r2}
      {b.q}
      <br></br>
      {b.p1}
      {b.p2}
      {b.p3}
      {b.p4}
      {b.p5}
      {b.p6}
      {b.p7}
      {b.p8}
      </div>
    <div className='chessboard'>
      {/* {b.k} */}
      {chessBoard}


    <div className='whiteDiv'>
      {b.K}
      {b.N1}
      {b.N2}
      {b.B1}
      {b.B2}
      {b.R1}
      {b.R2}
      {b.Q}
      {b.P1}
      {b.P2}
      {b.P3}
      {b.P4}
      {b.P5}
      {b.P6}
      {b.P7}
      {b.P8}
      </div>

      <button onClick={() => {reRenderBoard('white')}} type="button">Show White Sq Ctrl</button>
      <button onClick={() => {reRenderBoard('black')}} type="button">Show Black Sq Ctrl</button>
      <button onClick={() => {setInitialBoardPosition()}} type="button">Set Initial Board Position</button>
      <button onClick={() => {renderBoard(alwaysEmptyMatrix, alwaysEmptyMatrix)}} type="button">Clear Board</button>
 </div>
  </div>
  )
};

export default Visualizer;