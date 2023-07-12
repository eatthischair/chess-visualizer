import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import './App.css';
import RenderPieces from './RenderPieces.js';
import CalcSqs from './ColorCalcFunctions/CalcSqs.jsx';
import makeEmptyMatrix from './HelperFunctions/makeEmptyMatrix.js';
import PgnReader from './PgnFunctions/PgnReader.jsx';

import makePieceElements from './makePieceElements.js';
import setInitialBoardPosition from './setInitialBoard.js';
import movePiece from './movePiece.js';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import RadioButtons from './RadioButtons';
import renderRadioButtons from './renderRadioButtons.js';
import renderColorPalletes from './renderColorPalletes.js';

const Visualizer = ({setPos, currentHoverPosition, getPos, globalBoard, updateGlobalBoard, getGlobalBoard, updateInitialBoard, getInitialBoard, updatePgnBoardArray, getNextBoard, getPreviousBoard, cookies, colorToUpdate, updateColor, getColor}) => {

  const [color1, setColor1] = useColor("hex", "#121212");
  const [color2, setColor2] = useColor("hex", "#121212");

  const [currentBoard, setCurrentBoard] = useState([])
  const [currentPgn, setCurrentPgn] = useState('');
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const [toggleImportPgn, setToggleImportPgn] = useState(false);
  const [showPieceElements, setShowPieceElements] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userGames, setUserGames] = useState([]);
  const [sumMode, setSumMode] = useState(true);


  const [pieceObj, setPieceObj] = useState({});

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

  // React.useEffect(() => {
  //   if (currentUser !== '') {
  //     axios.get(`http://localhost:8000/getGames?username=${currentUser}`)
  //     .then(results => {
  //       // console.log('games results', results.data.rows);
  //       setUserGames(results.data.rows)
  //     })
  //   .catch(err => {
  //       // console.log('err in submit', err);
  //     })
  //   }
  // }, [])


  const onDrop = (e, pieceId) => {
    e.preventDefault();
    e.stopPropagation();
    movePiece(getPos(), pieceId, getGlobalBoard, updateGlobalBoard, setCurrentBoard);
  }

  var emptyMatrix = makeEmptyMatrix();

  const clearBoard = () => {
    updateGlobalBoard(emptyMatrix)
    setCurrentBoard(emptyMatrix);
  }

  const readPgn = () => {
    // let initBoard = getInitialBoard();
    // let boards = PgnReader(initBoard, currentPgn);
    // updatePgnBoardArray(boards);
    updatePgnBoardArray(PgnReader(getInitialBoard(), currentPgn));
  }

  const pgnInput = (e) => {
    setCurrentPgn(e.target.value);
  }

  const saveGameToDB = () => {
    let sendObj = {
      pgn: currentPgn,
      user: currentUser
    };
    axios.post('http://localhost:8000/saveGame', sendObj)
    .then(results => {
      console.log('results', results);
    }).catch(err => {
      console.log('err in submit', err);
    })
  }

  const [hexObj, setHexObj] = useState(require('./hexObj.js'))

  const colorChange1 = (event) => {
    setColor1(event);
    setHexObj({...hexObj, [getColor() + '1']: event.hex});
  }

  const colorChange2 = (event) => {
    setColor2(event);
    setHexObj({...hexObj, [getColor() + '2']: event.hex});
  }

  const hexUpdate = (hexToUpdate) => {
    updateColor(hexToUpdate);
    setShowWheel(true);
  }

  const [blackCtrlOn, setBlackCtrlOn] = useState(false);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(false);
  const [showColorWheel, setShowColorWheel] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  const [initialRen, setInitialRen] = useState(true);

  if (initialRen) {
    setPieceObj(makePieceElements(onDrop))
    let newBoard = setInitialBoardPosition(emptyMatrix);
    updateGlobalBoard(newBoard)
    setCurrentBoard(newBoard);
    updateInitialBoard(newBoard)
    setCurrentUser(cookies.name)
    setInitialRen(false);
    setUserGames(require('./loremIpsum.js'))
  }

  return (
    // <div class='grid grid-cols-3 border-2 border-red-50 h-[560px]'>
    <div class='flex grid-cols-3 border-2 border-red-50 h-1/2 justify-center'>

    <div class='flex-row w-64 h-max border-2 border-red-950 overflow-x-clip overflow-y-scroll'>
        <div class='flex flex-row'>
        <button class="btn btn-primary basis-2 grow text-[9px] leading-3 indent-0">Famous Games</button>
        <button class="btn btn-primary basis-2 shrink text-[9px] leading-3 indent-0">Agadmator's Games</button>
        <button class="btn btn-primary basis-2 shrink text-[9px] leading-3 indent-0">User Games</button>
        </div>

      {userGames ?
       userGames.map(game => <div class='border-2 border-red-50 h-[100px] overflow-clip'>{game}</div>) : ''}
    </div>

    <CalcSqs blackCtrlOn={blackCtrlOn} whiteCtrlOn={whiteCtrlOn} currentBoard={currentBoard} pieceObj={pieceObj}      alwaysEmptyMatrix={emptyMatrix} setPos={setPos} boardIsFlipped={boardIsFlipped} sumMode={sumMode} color1={color1.hex} color2={color2.hex} hexObj={hexObj}/>

    <div class='grid grid-rows-2 w-64 h-[300px] border-2 border-red-50 '>
      <button class='btn-secondary' onClick={() => {setInitialBoardPosition()}}>Starting Position</button>
      <button class='btn-secondary' onClick={() => clearBoard()}>Clear Board</button>
      <button class='btn-secondary' onClick={() => setShowPieceElements(!showPieceElements)}>Add Pieces</button>
      {showPieceElements ?
      <div className='pieceDiv' class='flex h-[200px] flex-none grid grid-rows-8 w-66 overflow-scroll overflow-y-scroll'>
      {Object.keys(pieceObj).map((pieceId, index) => {
        return (
          <RenderPieces pieceId={pieceId} pieceElement={Object.entries(pieceObj)[index][1]}/>
            )}
          )}
        </div> : ''}
    </div>

    {/* <div className='buttons' class='ml-[500px] align-items-center grid grid-cols-4 w-[512px] max-w-[512px]'>
      <button class='btn-primary' onClick={() => setWhiteCtrlOn(!whiteCtrlOn)}>Show White Sq Ctrl</button>
      <button class='btn-primary' onClick={() => {setBlackCtrlOn(!blackCtrlOn)}} >Show Black Sq Ctrl</button>
      <button class='btn-primary' onClick={() => setBoardIsFlipped(!boardIsFlipped)} type="button">Flip Board</button>
    </div>

    <button class='btn-primary ml-[500px] align-items-center grid grid-cols-4 w-[512px] max-w-[512px]' onClick={() => setShowColorWheel(!showColorWheel)}>Color Wheel</button>

    {showColorWheel ?
    <div>
      <br></br>
      <div className="collapse bg-base-200">
          <input type="checkbox" name="my-accordion-1" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Normal Sq Colors
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            {RadioButtons('whiteSquare', 0, hexUpdate)}
            {RadioButtons('blackSquare', 0, hexUpdate)}
            {showWheel ? renderColorPalletes(color1, colorChange1, color2, colorChange2): ''}
          </div>
        </div>
      <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            White Sq Colors
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            {renderRadioButtons('redSquare', hexUpdate)}
            {showWheel ? renderColorPalletes(color1, colorChange1, color2, colorChange2): ''}
              </div>
        </div>
      <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Black Sq Colors
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            {renderRadioButtons('blueSquare', hexUpdate)}
            {showWheel ? renderColorPalletes(color1, colorChange1, color2, colorChange2): ''}
          </div>
      </div>
</div> : ''}


      <div class="items-center mb-4">
        <input onChange={() => setSumMode(true)} id="default-radio-2" type="radio" value="" checked={sumMode}  name="default-radio" class="radio-1"/>
        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">By Sum</label>
      </div>
      <div class="items-center">
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
      </div> */}
      </div>
  )
};

export default Visualizer;