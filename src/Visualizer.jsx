import React, {useState} from 'react';
import './App.css';
import 'react-color-palette/lib/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import {emptyMatrix, initialBoard} from './utils/Constants.js';
import MakePieceElements from './utils/MakePieceElements.js';
import {selectedGames} from './utils/selectedGames.js';
import CalcSqs from './ColorCalcFunctions/CalcSqs';
import PgnReader from './GameReader/PgnReader';
import MovePiece from './Rendering/MovePiece';
import GrabTitle from './GameReader/GrabTitle';
import ImportGame from './GameReader/ImportGame';
import RightSidebar from './RightSideBar.jsx';
import {BottomBar} from './BottomBar';
import LeftSideBar from './LeftSideBar';

const Visualizer = ({setPos, getPos, updatePgnBoardArray, resetMoveNum}) => {
  const [currentBoard, setCurrentBoard] = useState(initialBoard);

  //sidebar Toggles
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);

  //function attached to piece elements, runs when the piece is dropped on a new square, or in trashcan
  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    MovePiece(getPos(), pieceId, setCurrentBoard, currentBoard);
  };

  const pieceObj = MakePieceElements(onDrop);

  const [playerNames, setPlayerNames] = useState('');
  const clearBoard = () => {
    setCurrentBoard(emptyMatrix);
    //reset all PGN related states
    resetMoveNum();
    setCurrentPgn('');
    setPlayerNames('');
  };

  //pgn functions
  const [currentPgn, setCurrentPgn] = useState('');
  const pgnInput = e => {
    setCurrentPgn(e.target.value);
  };

  //to prevent crashes by rendering invalid pgn
  const [pgnValid, setPgnValid] = useState(true);

  const readPgn = index => {
    let pgnToRead = index || index === 0 ? selectedGames[index] : currentPgn;
    let {boardArray, pgnIsValid} = PgnReader(initialBoard, pgnToRead);
    setCurrentPgn(pgnToRead);
    updatePgnBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(pgnToRead));
    setCurrentBoard(initialBoard);
    resetMoveNum();
  };

  return (
    <div>
      <div className="mt-2"></div>
      <h1 className="flex justify-center body-font font-GreatVibes text-6xl mt-4">
        Chess Visualizer
      </h1>
      <div className="flex justify-center">
        {playerNames ? playerNames : <br></br>}
      </div>

      <div className="flex justify-center h-[520px] m-0">
        <div>
          <LeftSideBar readPgn={readPgn} />
        </div>
        <div className="flex">
          <CalcSqs
            blackCtrlOn={blackCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            currentBoard={currentBoard}
            pieceObj={pieceObj}
            alwaysEmptyMatrix={emptyMatrix}
            boardIsFlipped={boardIsFlipped}
          />
        </div>
        <div className="flex">
          <RightSidebar
            setCurrentBoard={setCurrentBoard}
            pieceObj={pieceObj}
            clearBoard={clearBoard}
            setWhiteCtrlOn={setWhiteCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            setBlackCtrlOn={setBlackCtrlOn}
            blackCtrlOn={blackCtrlOn}
            setBoardIsFlipped={setBoardIsFlipped}
            boardIsFlipped={boardIsFlipped}
            setPos={setPos}
          />
        </div>
      </div>
      <div className="grid grid-rows-2 justify-center gap-x-32 mt-24">
        <div>
          <BottomBar
            currentPgn={currentPgn}
            setCurrentBoard={setCurrentBoard}
          />
        </div>
        <ImportGame pgnInput={pgnInput} readPgn={readPgn} pgnValid={pgnValid} />
      </div>
    </div>
  );
};

export default Visualizer;
