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

const Visualizer = ({setPos, currentHoverPosition, getPos, globalBoard, updateGlobalBoard, getGlobalBoard, updateInitialBoard,        getInitialBoard, updatePgnBoardArray, getNextBoard, getPreviousBoard, cookies, colorToUpdate, updateColor, getColor}) => {

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
    let initBoard = getInitialBoard();
    let boards = PgnReader(initBoard, currentPgn);
    updatePgnBoardArray(boards)
  }

  const pgnInput = (e) => {
    setCurrentPgn(e.target.value);
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

  const renderRadioButtons = (color) => {
    let buttons = [];
    for (var i = 1; i < 8; i++) {
      buttons.push(RadioButtons(color, i, hexUpdate))
    }
    return buttons;
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
  }

  return (
    <div className='bigDiv' class='flex grid grid-cols-3'>
    <div class='flex-row w-64 h-[512px] ml-[230px] border-black border-2 overflow-scroll overflow-y-scroll'>
      {userGames.length !== 0 ? JSON.stringify(userGames[0].pgn) : ''}
    </div>

    <CalcSqs blackCtrlOn={blackCtrlOn} whiteCtrlOn={whiteCtrlOn} currentBoard={currentBoard} pieceObj={pieceObj} alwaysEmptyMatrix={emptyMatrix} setPos={setPos} boardIsFlipped={boardIsFlipped} sumMode={sumMode} color1={color1.hex} color2={color2.hex} hexObj={hexObj}/>

    <div class='flex grid grid-rows-2 w-64 h-[300px] mt-[100px]'>
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

    <div className='buttons' class='flex ml-[500px] align-items-center grid grid-cols-4 w-[512px] max-w-[512px]'>
      <button class='btn-primary' onClick={() => setWhiteCtrlOn(!whiteCtrlOn)}>Show White Sq Ctrl</button>
      <button class='btn-primary' onClick={() => {setBlackCtrlOn(!blackCtrlOn)}} >Show Black Sq Ctrl</button>
      <button class='btn-primary' onClick={() => setBoardIsFlipped(!boardIsFlipped)} type="button">Flip Board</button>
    </div>

    <button class='btn-primary ml-[500px] align-items-center grid grid-cols-4 w-[512px] max-w-[512px]' onClick={() => setShowColorWheel(!showColorWheel)}>Color Wheel</button>

    {showColorWheel ?
    <div>
      <br></br>
      <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Normal Sq Colors
          </div>
          <div className="collapse-content">
            {/* <input onClick={() => hexUpdate('whiteSquare')} type="radio" name="radio-1" className="radio"/>
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Color</label> */}
            {RadioButtons('whiteSquare', 0, hexUpdate)}
            {RadioButtons('blackSquare', 0, hexUpdate)}
            {/* <input onClick={() => hexUpdate('blackSquare')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Color</label> */}

            {showWheel ?
              <div>
                <ColorPicker width={256} height={128}
                  color={color1}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange1(e)}} />

                   <ColorPicker width={256} height={128}
                  color={color2}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange2(e)}} />
              </div> : ''}
          </div>
        </div>

      <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            White Sq Colors
          </div>
          <div className="collapse-content">
            {/* <input onClick={() => hexUpdate('redSquare1')} type="radio" name="radio-1" className="radio"/>
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 1</label>
            <input onClick={() => hexUpdate('redSquare2')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 2</label>
            <input onClick={() => hexUpdate('redSquare3')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 3</label>

            <input onClick={() => hexUpdate('redSquare4')} type="radio" name="radio-1" className="radio"/>
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 4</label>
            <input onClick={() => hexUpdate('redSquare5')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 5</label>
            <input onClick={() => hexUpdate('redSquare6')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 6</label>
            <input onClick={() => hexUpdate('redSquare7')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">White Sq Ctrl 7</label> */}
            {renderRadioButtons('redSquare')}
            {showWheel ?
              <div>
                <ColorPicker width={256} height={128}
                  color={color1}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange1(e)}} />

                   <ColorPicker width={256} height={128}
                  color={color2}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange2(e)}} />
              </div> : ''}
              </div>
        </div>
      <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Black Sq Colors
          </div>
          <div className="collapse-content">
            {/* <input onClick={() => hexUpdate('blueSquare1')} type="radio" name="radio-1" className="radio"/>
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 1</label>
            <input onClick={() => hexUpdate('blueSquare2')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 2</label>
            <input onClick={() => hexUpdate('blueSquare3')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 3</label>
            <input onClick={() => hexUpdate('blueSquare4')} type="radio" name="radio-1" className="radio"/>
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 4</label>
            <input onClick={() => hexUpdate('blueSquare5')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 5</label>
            <input onClick={() => hexUpdate('blueSquare6')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 6</label>
            <input onClick={() => hexUpdate('blueSquare7')} type="radio" name="radio-1" className="radio" />
            <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Sq Ctrl 7</label> */}
            {renderRadioButtons('blueSquare')}
            {showWheel ?
              <div>
                <ColorPicker width={256} height={128}
                  color={color1}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange1(e)}} />

                   <ColorPicker width={256} height={128}
                  color={color2}
                  hideHSV dark alpha
                  onChange={(e) => {colorChange2(e)}} />
              </div> : ''}
          </div>
      </div>
</div> : ''}


      <div class="flex items-center mb-4">
        <input onChange={() => setSumMode(true)} id="default-radio-2" type="radio" value="" checked={sumMode}  name="default-radio" class="radio-1"/>
        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">By Sum</label>
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
  )
};

export default Visualizer;