import React, {useState} from 'react';
import './App.css';
import {emptyMatrix, initialBoard} from './utils/Constants.js';
import MakePieceElements from './utils/MakePieceElements.js';
import CalcSqs from './ColorCalcFunctions/CalcSqs';
import MovePiece from './Rendering/MovePiece';
import PgnReader from './PGNReader/PgnReader.js';
import ParsePlayerNames from './PGNReader/ParsePlayerNames.js';
import ImportGame from './PGNReader/ImportGame.js';
import RightSidebar from './SideAndBottomBars/RightSideBar.jsx';
import BottomBar from './SideAndBottomBars/BottomBar';
import LeftSideBar from './SideAndBottomBars/LeftSideBar';
import {UseBoardArray} from './CustomHooks/UseBoardArray';
import {Header} from './Header';

const Visualizer = () => {
  //board displayed on  app
  const [currentBoard, setCurrentBoard] = useState(initialBoard);

  //function attached to piece imgs, runs when the piece is dropped on a new square, or in trashcan, and rerenders current board
  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    MovePiece(pieceId, setCurrentBoard, currentBoard);
  };
  const pieceObj = MakePieceElements(onDrop);

  //--------------------------
  //pgn functions
  const [currentPgn, setCurrentPgn] = useState('');
  const pgnInput = e => {
    setCurrentPgn(e.target.value);
  };

  //prevent crashes via rendering invalid pgn
  const [pgnValid, setPgnValid] = useState(true);

  const {
    updateBoardArray,
    getNextBoard,
    getPreviousBoard,
    getFirstBoard,
    getLastBoard,
    removeBoardArray,
  } = UseBoardArray();

  const [playerNames, setPlayerNames] = useState('');

  const readPgn = pgn => {
    let {boardArray, pgnIsValid} = PgnReader(pgn);
    setCurrentPgn(pgn);
    updateBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(ParsePlayerNames(pgn));
    setCurrentBoard(initialBoard);
  };
  //-------------------------------

  //sidebar Button
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);

  const clearBoard = () => {
    setCurrentBoard(emptyMatrix);
    setCurrentPgn('');
    setPlayerNames('');
    removeBoardArray();
  };

  return (
    <div>
      <Header playerNames={playerNames}></Header>

      <div className="flex justify-center h-[520px] m-0">
        <aside>
          <LeftSideBar readPgn={readPgn} />
        </aside>
        <main className="flex">
          <CalcSqs
            blackCtrlOn={blackCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            currentBoard={currentBoard}
            pieceObj={pieceObj}
            alwaysEmptyMatrix={emptyMatrix}
            boardIsFlipped={boardIsFlipped}
          />
        </main>
        <aside className="flex">
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
            getFirstBoard={getFirstBoard}
          />
        </aside>
      </div>
      <div className="grid gap-x-32 mt-24">
        <BottomBar
          currentPgn={currentPgn}
          setCurrentBoard={setCurrentBoard}
          getNextBoard={getNextBoard}
          getPreviousBoard={getPreviousBoard}
          getFirstBoard={getFirstBoard}
          getLastBoard={getLastBoard}
        />
        <ImportGame
          pgnInput={pgnInput}
          readPgn={readPgn}
          currentPgn={currentPgn}
          pgnValid={pgnValid}
        />
      </div>
    </div>
  );
};

export default Visualizer;
