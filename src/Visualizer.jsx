import React, {useState, useReducer} from 'react';
import './App.css';
import {emptyMatrix, initialBoard} from './utils/Constants.js';
import MakePieceElements from './utils/MakePieceElements.js';
import {selectedGames} from './utils/SelectedGames.js';
import CalcSqs from './ColorCalcFunctions/CalcSqs';
import PgnReader from './PGNReader/PgnReader.js';
import MovePiece from './Rendering/MovePiece';
import GrabTitle from './PGNReader/GrabTitle.js';
import ImportGame from './PGNReader/ImportGame.js';
import RightSidebar from './SideAndBottomBars/RightSideBar.jsx';
import {BottomBar} from './SideAndBottomBars/BottomBar';
import LeftSideBar from './SideAndBottomBars/LeftSideBar';
import {reducer, initialState} from './ContextFiles/Reducer';

const Visualizer = ({updatePgnBoardArray, resetMoveNum}) => {
  //board displayed on the app
  const [currentBoard, setCurrentBoard] = useState(initialBoard);

  //sidebar Buttons
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);
  const clearBoard = () => {
    setCurrentBoard(emptyMatrix);
    //reset all PGN related states
    //which is why func is not in sidebar component
    resetMoveNum();
    setCurrentPgn('');
    setPlayerNames('');
  };

  //function attached to piece elements, runs when the piece is dropped on a new square, or in trashcan
  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    MovePiece(pieceId, setCurrentBoard, currentBoard);
  };

  const pieceObj = MakePieceElements(onDrop);

  const [playerNames, setPlayerNames] = useState('');

  //pgn functions
  const [currentPgn, setCurrentPgn] = useState('');
  const pgnInput = e => {
    setCurrentPgn(e.target.value);
  };

  //to prevent crashes by rendering invalid pgn
  const [pgnValid, setPgnValid] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);

  const readPgn = index => {
    //index is for games from sidebar
    let pgnToRead = index || index === 0 ? selectedGames[index] : currentPgn;
    let {boardArray, pgnIsValid} = PgnReader(initialBoard, pgnToRead);
    setCurrentPgn(pgnToRead);

    dispatch({type: 'UPDATE_PGN_BOARD_ARRAY', payload: boardArray});
    dispatch({type: 'RESET_MOVE_NUM', payload: -1});
    // updatePgnBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(pgnToRead));
    setCurrentBoard(initialBoard);

    // resetMoveNum();
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
