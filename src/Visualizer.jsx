import React, {useState, useEffect} from 'react';
import './App.css';
import RenderPieces from './MakeElements/RenderPieces';
import CalcSqs from './ColorCalcFunctions/CalcSqs';
import emptyMatrix from './HelperFunctions/MakeEmptyMatrix';
import PgnReader from './GameReader/PgnReader';
import MakePieceElements from './MakeElements/MakePieceElements.js';
import {initialBoard} from './MakeElements/SetInitialBoard';
import MovePiece from './Rendering/MovePiece';
import 'react-color-palette/lib/css/styles.css';
import GrabTitle from './GameReader/GrabTitle';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import ImportGame from './GameReader/ImportGame';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useKeyboardNavigation from './CustomHooks/UseKeyboardNavigation';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import SelectedGames from './MakeElements/SelectedGames';
const Visualizer = ({
  setPos,
  currentHoverPosition,
  getPos,
  updateGlobalBoard,
  getGlobalBoard,
  updatePgnBoardArray,
  getNextBoard,
  getPreviousBoard,
  resetMoveNum,
  getFirstBoard,
  getLastBoard,
  boardElsMatrix,
  updateBoardEls,
  returnBoardEls,
}) => {
  const [currentBoard, setCurrentBoard] = useState(initialBoard);
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const next = () => {
    setCurrentBoard(getNextBoard());
  };
  const prev = () => {
    setCurrentBoard(getPreviousBoard());
  };
  const first = () => {
    let firstBoard = getFirstBoard();
    if (firstBoard) setCurrentBoard(firstBoard);
  };
  const last = () => {
    let lastBoard = getLastBoard();
    if (lastBoard) setCurrentBoard(getLastBoard());
  };

  useKeyboardNavigation(next, prev, last, first);

  //function attached to piece elements, runs when the piece is dropped on a new square, or in trashcan
  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    MovePiece(
      getPos(),
      pieceId,
      getGlobalBoard,
      updateGlobalBoard,
      setCurrentBoard,
    );
  };

  const pieceObj = MakePieceElements(onDrop);

  const clearBoard = () => {
    updateGlobalBoard(emptyMatrix);
    setCurrentBoard(emptyMatrix);
    resetMoveNum();
    setCurrentPgn('');
    setPlayerNames('');
  };
  const setInitialBoard = () => {
    updateGlobalBoard(initialBoard);
    first();
  };

  //pgn functions
  const [currentPgn, setCurrentPgn] = useState('');
  const pgnInput = e => {
    setCurrentPgn(e.target.value);
  };

  const readPgn = index => {
    //index is only passed via the games in the sidebar. userGames is the array of games to the left of the board
    let pgnToRead = index || index === 0 ? SelectedGames[index] : currentPgn;
    let {boardArray, pgnIsValid} = PgnReader(initialBoard, pgnToRead);
    setCurrentPgn(pgnToRead);
    updatePgnBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(pgnToRead));
    setCurrentBoard(initialBoard);
    resetMoveNum();
  };

  const [pgnValid, setPgnValid] = useState(true);
  const [playerNames, setPlayerNames] = useState('');
  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);

  return (
    <div>
      <div className="mt-2"></div>
      <div className="flex justify-center body-font font-GreatVibes text-6xl mt-4">
        Chess Visualizer
      </div>
      <div className="flex justify-center">
        {playerNames ? playerNames : <br></br>}
      </div>

      <div className="flex justify-center h-[520px] m-0">
        <div className="w-64 h-[520px] overflow-x-clip overflow-y-scroll">
          <div className="flex flex-row">
            <div className="flex justify-center place-self-center basis-2 grow text-sm leading-3 indent-0 h-8 mt-4 font-semibold text-slate-100">
              Selected Games
            </div>
          </div>
          {SelectedGames.map((game, index) => (
            <div
              key={game}
              onClick={() => {
                readPgn(index);
              }}
              className="btn-tertiary shadow-md">
              {GrabTitle(game)}
            </div>
          ))}
        </div>

        <div className="flex">
          <CalcSqs
            blackCtrlOn={blackCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            currentBoard={currentBoard}
            pieceObj={pieceObj}
            alwaysEmptyMatrix={emptyMatrix}
            setPos={setPos}
            boardIsFlipped={boardIsFlipped}
            boardElsMatrix={boardElsMatrix}
            updateBoardEls={updateBoardEls}
            returnBoardEls={returnBoardEls}
          />
        </div>
        <div className="flex">
          <Sidebar
            pieceObj={pieceObj}
            RenderPieces={RenderPieces}
            setInitialBoard={setInitialBoard}
            clearBoard={clearBoard}
            setWhiteCtrlOn={setWhiteCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            setBlackCtrlOn={setBlackCtrlOn}
            blackCtrlOn={blackCtrlOn}
            setBoardIsFlipped={setBoardIsFlipped}
            boardIsFlipped={boardIsFlipped}
            onDrop={onDrop}
            setPos={setPos}
          />
        </div>
      </div>

      <div className="flex flex-initial justify-center gap-x-32 mt-24">
        <ImportGame pgnInput={pgnInput} readPgn={readPgn} pgnValid={pgnValid} />
      </div>

      <div>
        {currentPgn ? (
          <div className="flex flex-initial justify-center gap-x-32 text-gray-700">
            <div onClick={() => first()}>
              <FontAwesomeIcon icon={faBackwardFast} />
            </div>
            <div onClick={() => prev()}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </div>
            <div onClick={() => next()}>
              <FontAwesomeIcon icon={faForwardStep} />
            </div>
            <div onClick={() => last()}>
              <FontAwesomeIcon icon={faForwardFast} />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Visualizer;
