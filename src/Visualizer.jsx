import React, { useState } from "react";
import "./App.css";
import RenderPieces from "./Initialization/RenderPieces.js";
import CalcSqs from "./ColorCalcFunctions/CalcSqs";
import makeEmptyMatrix from "./HelperFunctions/makeEmptyMatrix";
import PgnReader from "./PgnFunctions/PgnReader";
import makePieceElements from "./Initialization/makePieceElements.js";
import setInitialBoardPosition from "./Initialization/setInitialBoard.js";
import movePiece from "./movePiece.js";
import { useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import RadioButtons from "./ColorOptions/RadioButtons";
import renderRadioButtons from "./ColorOptions/renderRadioButtons.js";
import renderColorPalletes from "./ColorOptions/renderColorPalletes.js";
import GrabTitle from "./PgnFunctions/GrabTitle";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import ColorOptions from "./ColorOptions/ColorOptions";
import ImportGame from "./ImportGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardFast } from "@fortawesome/free-solid-svg-icons";

import selectedGames from './Initialization/selectedGames';
const Visualizer = ({
  setPos,
  currentHoverPosition,
  getPos,
  globalBoard,
  updateGlobalBoard,
  getGlobalBoard,
  updateInitialBoard,
  getInitialBoard,
  updatePgnBoardArray,
  getNextBoard,
  getPreviousBoard,
  cookies,
  colorToUpdate,
  updateColor,
  getColor,
  resetMoveNum,
  getFirstBoard,
  getLastBoard,
  moveNum,
}) => {
  const [currentBoard, setCurrentBoard] = useState([]);
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [showPieceElements, setShowPieceElements] = useState(false);
  const [pieceObj, setPieceObj] = useState({});

  React.useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowUp") last();
      if (event.key === "ArrowDown") first();
    });
  }, []);

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

  //function attached to piece elements, runs when the piece is dropped on a new square, or in trashcan
  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    movePiece(
      getPos(),
      pieceId,
      getGlobalBoard,
      updateGlobalBoard,
      setCurrentBoard
    );
  };

  let emptyMatrix = makeEmptyMatrix();
  const clearBoard = () => {
    updateGlobalBoard(emptyMatrix);
    setCurrentBoard(emptyMatrix);
    resetMoveNum();
    setCurrentPgn("");
    setPlayerNames("");
  };
  const setInitialBoard = () => {
    let board = getInitialBoard();
    updateGlobalBoard(board);
    first();
  };

  //pgn functions
  const [currentPgn, setCurrentPgn] = useState("");
  const pgnInput = (e) => {
    setCurrentPgn(e.target.value);
  };

  const readPgn = (index) => {
    //index is only passed via the games in the sidebar. userGames is the array of games to the left of the board
    let pgnToRead = index || index === 0 ? selectedGames[index] : currentPgn;
    let { boardArray, pgnIsValid } = PgnReader(getInitialBoard(), pgnToRead);
    setCurrentPgn(pgnToRead);
    updatePgnBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(pgnToRead));
    setCurrentBoard(getInitialBoard());
    resetMoveNum();
  };

  const [pgnValid, setPgnValid] = useState(true);

  const [playerNames, setPlayerNames] = useState("");

  //color change functions
  const [color1, setColor1] = useColor("hex", "#121212");
  const [color2, setColor2] = useColor("hex", "#121212");
  const [hexObj, setHexObj] = useState(require("./Initialization/hexObj.js"));
  const colorChange1 = (event) => {
    setColor1(event);
    setHexObj({ ...hexObj, [getColor() + "1"]: event.hex });
  };
  const colorChange2 = (event) => {
    setColor2(event);
    setHexObj({ ...hexObj, [getColor() + "2"]: event.hex });
  };
  const hexUpdate = (hexToUpdate) => {
    updateColor(hexToUpdate);
  };

  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);
  const [initialRen, setInitialRen] = useState(true);

  if (initialRen) {
    setPieceObj(makePieceElements(onDrop));
    let newBoard = setInitialBoardPosition(emptyMatrix);
    updateGlobalBoard(newBoard);
    setCurrentBoard(newBoard);
    updateInitialBoard(newBoard);
    setInitialRen(false);
  }

  return (
    <div>
      <div class="flex justify-center body-font font-GreatVibes text-6xl">
        Chess Visualizer
      </div>

      <div class="flex justify-center">
        {playerNames ? playerNames : <br></br>}
      </div>

      <div class="flex justify-center h-[520px] m-0">
        <div class="w-64 h-[520px] overflow-x-clip overflow-y-scroll">
          <div class="flex flex-row">
            <div class="flex justify-center place-self-center basis-2 grow text-sm leading-3 indent-0 h-8 mt-4 font-semibold text-slate-100">
              Selected Games
            </div>
          </div>
          {selectedGames.map((game, index) => (
            <div
              onClick={() => {
                readPgn(index);
              }}
              class="btn-tertiary"
            >
              {GrabTitle(game)}
            </div>
          ))}
        </div>

        <div>
          <CalcSqs
            blackCtrlOn={blackCtrlOn}
            whiteCtrlOn={whiteCtrlOn}
            currentBoard={currentBoard}
            pieceObj={pieceObj}
            alwaysEmptyMatrix={emptyMatrix}
            setPos={setPos}
            boardIsFlipped={boardIsFlipped}
            color1={color1.hex}
            color2={color2.hex}
            hexObj={hexObj}
          />
        </div>
        <div>
          <Sidebar
            showPieceElements={showPieceElements}
            pieceObj={pieceObj}
            RenderPieces={RenderPieces}
            setInitialBoard={setInitialBoard}
            clearBoard={clearBoard}
            setShowPieceElements={setShowPieceElements}
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

      <div class="flex flex-initial justify-center gap-x-32">
        <ColorOptions
          RadioButtons={RadioButtons}
          hexUpdate={hexUpdate}
          renderColorPalletes={renderColorPalletes}
          colorChange1={colorChange1}
          color2={color2}
          colorChange2={colorChange2}
          renderRadioButtons={renderRadioButtons}
          hexObj={hexObj}
          color1={color1}
        />

        <ImportGame pgnInput={pgnInput} readPgn={readPgn} pgnValid={pgnValid} />
      </div>
      <div>
        {currentPgn ? (
          <div class="flex flex-initial justify-center gap-x-32 text-gray-700">
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
          ""
        )}
      </div>
    </div>
  );
};

export default Visualizer;
