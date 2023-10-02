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

import { ColorPicker } from "react-color-palette";

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
    });
  }, []);

  //function attached to piece elements, runs when the piece is dropped on a new square
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
  };
  const setInitialBoard = () => {
    let board = getInitialBoard();
    updateGlobalBoard(board);
    setCurrentBoard(board);
  };

  //pgn functions
  const readPgn = () => {
    let { boardArray, pgnIsValid } = PgnReader(getInitialBoard(), currentPgn);
    updatePgnBoardArray(boardArray);
    setPgnImported(pgnIsValid);
    setPgnValid(pgnIsValid);
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
  // icon({name: 'faBackwardFast', family: 'classic', style: 'regular'})

  return (
    <div>
      {/* {pgnImported ? notify() : ""}
      {pgnImported ? (
        <div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      ) : (
        ""
      )} */}

      <div class="flex justify-center">{playerNames}</div>

      <div class="flex justify-center border-2 border-red-50 h-[520px] m-0">
        <div class="w-64 h-[520px] border-2 border-red-950 overflow-x-clip overflow-y-scroll">
          <div class="flex flex-row">
            <button class="btn join-item btn-primary basis-2 grow text-[12px] leading-3 indent-0">
              Selected Games
            </button>
          </div>
          {userGames
            ? userGames.map((game, index) => (
                <div
                  onClick={() => {
                    handlePgn(index);
                  }}
                  class="border-2 border-red-50 h-[100px] overflow-clip text-[12px]"
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
          />
        </div>
      </div>

      <div class="flex flex-initial border-amber-300 border-2 justify-center gap-x-32">
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

      <div class="flex flex-initial border-amber-300 border-2 justify-center gap-x-32 text-black">
        <FontAwesomeIcon icon={faBackwardFast} />
        <FontAwesomeIcon icon={faBackwardStep} />
        <FontAwesomeIcon icon={faForwardStep} />
        <FontAwesomeIcon icon={faForwardFast} />
      </div>
    </div>
  );
};

export default Visualizer;
