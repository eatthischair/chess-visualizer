import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import './App.css';
import ChessIcons from './ChessIcons.jsx';
import RenderPieces from './RenderPieces.jsx';
import CalcSqs from './CalcSqs.jsx';
import isWhiteSquare from './HelperFunctions/isWhiteSquare.jsx';
import makeEmptyMatrix from './HelperFunctions/makeEmptyMatrix.jsx';
import PgnReader from './PgnReader.jsx';

const Visualizer = ({setPos, currentHoverPosition, getPos, globalBoard, updateGlobalBoard, getGlobalBoard, updateInitialBoard, getInitialBoard, updatePgnBoardArray, getNextBoard, getPreviousBoard, cookies}) => {

  const [initialRen, setInitialRen] = useState(true);
  const [pieceObj, setPieceObj] = useState({});
  const [blackCtrlOn, setBlackCtrlOn] = useState(false);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(false);
  const [currentBoard, setCurrentBoard] = useState([])
  const [alwaysEmptyMatrix, setAlwaysEmptyMatrix] = useState([]);
  const [currentPgn, setCurrentPgn] = useState('');
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [toggleImportPgn, setToggleImportPgn] = useState(false);
  const [showPieceElements, setShowPieceElements] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userGames, setUserGames] = useState([]);
  const [sumMode, setSumMode] = useState(true);

  var makePieceElements = () => {
    var pieceElementsObj = {};
    let pieceArray = ['K', 'N', 'B', 'R', 'Q', 'P', 'k', 'n', 'b', 'r', 'q', 'p'];
    pieceArray.forEach(piece => {
      let pieceUrl = ChessIcons()[piece]
      for (var i = 1; i <= 64; i++) {
        let pieceString = `${piece}${i}`
        pieceElementsObj[pieceString] =
        <img draggable='true' alt='' src={pieceUrl} width='63' height='63'
        onDragEnd={(e)=> {onDrop(e, pieceString)}}></img>
      }
    })
    console.log('piece el obj', pieceElementsObj)
    setPieceObj(pieceElementsObj);
  }

  const setInitialBoardPosition = (emptyMatrix) => {
    emptyMatrix = emptyMatrix || alwaysEmptyMatrix;
    var newBoard = JSON.parse(JSON.stringify(emptyMatrix));
    var blackPieces = ['r1', 'n1', 'b1', 'q1', 'k1', 'b2', 'n2', 'r2']
    var blackPawns = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
    var whitePawns = blackPawns.map(pawn => {
      return pawn.toUpperCase();
    })
    var whitePieces = blackPieces.map(piece => {
      return piece.toUpperCase();
    })
    newBoard[0] = blackPieces;
    newBoard[1] = blackPawns;
    newBoard[6] = whitePawns;
    newBoard[7] = whitePieces;
    updateGlobalBoard(newBoard)
    setCurrentBoard(newBoard);
    updateInitialBoard(newBoard)
  }

  React.useEffect(() => {
    window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      setCurrentBoard(getNextBoard())
    }
    if (event.key === 'ArrowLeft') {
      setCurrentBoard(getPreviousBoard())
    }
    });
  }, []);

  React.useEffect(() => {
    if (currentUser !== '') {
      axios.get(`http://localhost:8000/getGames?username=${currentUser}`)
      .then(results => {
        console.log('games results', results.data.rows);
        setUserGames(results.data.rows)
      })
    .catch(err => {
        console.log('err in submit', err);
      })
    }
  }, [])

  if (initialRen) {
    let emptyMatrix = makeEmptyMatrix();
    setAlwaysEmptyMatrix(emptyMatrix);
    setInitialRen(false);
    makePieceElements();
    setInitialBoardPosition(emptyMatrix);
    setCurrentUser(cookies.name)
  }

  const movePiece = (squareId, pieceId) => {
    let currentBoard = getGlobalBoard();
    console.log('movepiece cur board', currentBoard)
    let boardMatrix = JSON.parse(JSON.stringify(currentBoard))
    let pieceIsOnBoard = false
    let pieceType = pieceId[0];
    let pieceTypeCounter = 0
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        let current = boardMatrix[i][j];
        if (current === pieceId) {
          boardMatrix[i][j] = 0;
          pieceIsOnBoard = true;
        }
        if (boardMatrix[i][j][0] === pieceType) {
          pieceTypeCounter++
        }
      }
    }
    if (!pieceIsOnBoard) {
      boardMatrix[squareId[0]][squareId[1]] = `${pieceType}${pieceTypeCounter + 1}`;
    } else {
      boardMatrix[squareId[0]][squareId[1]] = pieceId;
    }
    console.log('sum mode', sumMode)
    updateGlobalBoard(boardMatrix)
    setCurrentBoard(boardMatrix);
  }

  const onDrop = (e, pieceId) => {
    let hoverPosition = getPos();
    e.preventDefault();
    e.stopPropagation();
    movePiece(hoverPosition, pieceId);
  }

const clearBoard = () => {
  updateGlobalBoard(alwaysEmptyMatrix)
  setCurrentBoard(alwaysEmptyMatrix);
}

const readPgn = () => {
  let initBoard = getInitialBoard();
  let boards = PgnReader(initBoard, currentPgn);
  console.log('readpgn boards', boards, currentPgn);
  updatePgnBoardArray(boards)
}

const pgnInput = (e) => {
  console.log('e', e.target.value, typeof e.target.value);
  setCurrentPgn(e.target.value);
}

const saveGameToDB = () => {

  let sendObj = {
    pgn: currentPgn,
    user: currentUser
  };
  console.log('sendobj', sendObj)

  axios.post('http://localhost:8000/saveGame', sendObj)
  .then(results => {
    console.log('results', results);
  }).catch(err => {
    console.log('err in submit', err);
   })

}

  return (
    <div className='bigDiv' class='flex grid grid-cols-3'>
    <div class='flex flex-row w-64 h-[512px] ml-[230px] border-black border-2 overflow-scroll overflow-y-scroll'>
      {userGames.length !== 0 ? JSON.stringify(userGames[0].pgn) : ''}
    </div>

    <CalcSqs blackCtrlOn={blackCtrlOn} whiteCtrlOn={whiteCtrlOn} currentBoard={currentBoard} pieceObj={pieceObj} alwaysEmptyMatrix={alwaysEmptyMatrix} setPos={setPos} boardIsFlipped={boardIsFlipped} sumMode={sumMode}/>

    <div class='flex grid grid-rows-2 w-64 h-[300px] mt-[100px]'>
      <button class='btn-secondary' onClick={() => {setInitialBoardPosition()}}>Starting Position</button>
      <button class='btn-secondary' onClick={() => clearBoard(currentBoard)}>Clear Board</button>
      <button class='btn-secondary' onClick={() => setShowPieceElements(!showPieceElements)}>Add Pieces</button>
      {showPieceElements ?
       <div className='pieceDiv' class='flex h-[200px] flex-none grid grid-rows-8 w-66 overflow-scroll overflow-y-scroll'>
      {Object.keys(pieceObj).map((pieceId, index) => {
        return (
          <RenderPieces currentBoard={currentBoard} pieceId={pieceId} pieceElement={Object.entries(pieceObj)[index][1]}/>
          )}
          )}
        </div> : ''}

    </div>
    <div className='buttons' class='flex ml-[500px] align-items-center grid grid-cols-4 w-[512px] max-w-[512px]'>
      <button class='btn-primary' onClick={() => setWhiteCtrlOn(!whiteCtrlOn)}>Show White Sq Ctrl</button>
      <button class='btn-primary' onClick={() => {setBlackCtrlOn(!blackCtrlOn)}} >Show Black Sq Ctrl</button>
      <button class='btn-primary' onClick={() => setBoardIsFlipped(!boardIsFlipped)} type="button">Flip Board</button>

    <div class="flex items-center mb-4">
      <input onChange={() => setSumMode(true)} id="default-radio-1" type="radio" value="" checked={sumMode}  name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">By Sum</label>
    </div>
    <div class="flex items-center">
      <input onChange={() => setSumMode(false)} id="default-radio-2" type="radio" value="" checked={!sumMode} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">By Priority</label>
    </div>

      <button class='btn-primary' onClick={() => setToggleImportPgn(!toggleImportPgn)} type="button">Import Pgn</button>
      {toggleImportPgn ?
      <div>
        <button class='btn-primary' onClick={() => setCurrentBoard(getNextBoard())}>Next Move</button>
        <button class='btn-primary' onClick={() => setCurrentBoard(getPreviousBoard())} >Previous Move</button>
        <textarea class='w-[512px] text-black' onChange={(e) => pgnInput(e)} id="w3review" name="w3review" rows="4" cols="50">
        </textarea><button class='btn-primary' onClick={() => readPgn()} type="button">Render Game</button>
        <button class='btn-primary' onClick={() => saveGameToDB()} type="button">Save Game</button>
      </div> : ''}
      </div>
  </div>
  )
};

export default Visualizer;