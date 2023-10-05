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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar";
import ColorOptions from "./ColorOptions/ColorOptions";
import ImportGame from "./ImportGame";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardFast } from "@fortawesome/free-solid-svg-icons";

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
  const [currentPgn, setCurrentPgn] = useState("");
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [showPieceElements, setShowPieceElements] = useState(false);
  const [userGames, setUserGames] = useState([]);
  const [pieceObj, setPieceObj] = useState({});

  React.useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        setCurrentBoard(getNextBoard());
      }
      if (event.key === "ArrowLeft") {
        setCurrentBoard(getPreviousBoard());
      }
      if (event.key === "ArrowUp") {
        let lastBoard = getLastBoard();
        if (lastBoard) setCurrentBoard(getLastBoard());
      }
      if (event.key === "ArrowDown") {
        let firstBoard = getFirstBoard();
        if (firstBoard) setCurrentBoard(firstBoard);
      }
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

  //function attached to piece elements, runs when the piece is dropped on a new square
  const onDrop = (e, pieceId) => {
    let pos = getPos();

    console.log('im in ondrop boss', e, pieceId, pos)

    e.preventDefault();
    e.stopPropagation();
    movePiece(
      pos,
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
  };
  const setInitialBoard = () => {
    let board = getInitialBoard();
    updateGlobalBoard(board);
    first();
  };

  //pgn functions
  const readPgn = () => {
    let { boardArray, pgnIsValid } = PgnReader(getInitialBoard(), currentPgn);
    updatePgnBoardArray(boardArray);
    setPgnImported(pgnIsValid);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(currentPgn));
  };

  const [pgnValid, setPgnValid] = useState(false);

  const pgnInput = (e) => {
    setCurrentPgn(e.target.value);
  };

  const [playerNames, setPlayerNames] = useState("");
  const handlePgn = (index) => {
    setCurrentPgn(userGames[index]);
    let { boardArray } = PgnReader(getInitialBoard(), userGames[index]);
    updatePgnBoardArray(boardArray);
    setCurrentBoard(getInitialBoard());
    resetMoveNum();
    let names = GrabTitle(userGames[index]);
    setPlayerNames(names);
  };

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
    setShowWheel(true);
  };

  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);
  const [showWheel, setShowWheel] = useState(false);
  const [initialRen, setInitialRen] = useState(true);
  const [pgnImported, setPgnImported] = useState(false);

  if (initialRen) {
    setPieceObj(makePieceElements(onDrop));
    let newBoard = setInitialBoardPosition(emptyMatrix);
    updateGlobalBoard(newBoard);
    setCurrentBoard(newBoard);
    updateInitialBoard(newBoard);
    setInitialRen(false);
    setUserGames(require("./Initialization/loremIpsum.js"));
  }

  const notify = () => {
    let notifStr = "";
    pgnValid
      ? (notifStr = "Game Import Successful!")
      : (notifStr = "Invalid PGN");

    toast(notifStr, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
          {userGames
            ? userGames.map((game, index) => (
                <div
                  onClick={() => {
                    handlePgn(index);
                  }}
                  class="btn-tertiary"
                >
                  {GrabTitle(game)}
                </div>
              ))
            : ""}
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
          showWheel={showWheel}
          renderColorPalletes={renderColorPalletes}
          colorChange1={colorChange1}
          color2={color2}
          colorChange2={colorChange2}
          renderRadioButtons={renderRadioButtons}
          hexObj={hexObj}
          color1={color1}
        />

        <ImportGame
          pgnInput={pgnInput}
          readPgn={readPgn}
          setPgnImported={setPgnImported}
        />
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
