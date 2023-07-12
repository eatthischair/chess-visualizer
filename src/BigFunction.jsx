import React, { useState, useRef, useEffect } from 'react';
import Visualizer from './Visualizer.jsx';
import PgnReader from './PgnFunctions/PgnReader.jsx';
import { Link } from "react-router-dom";
import GameList from './GameList';

const BigFunction = (cookies) => {

  var currentHoverPosition;
  var colorToUpdate = '';

  const updateColor = (color) => {
    colorToUpdate = color;
  }
  const getColor = () => {
    return colorToUpdate;
  }

  const setPos = (id) => {
    currentHoverPosition = id;
    return currentHoverPosition;
  }
  const getPos = () => {
    return currentHoverPosition;
  }

  var globalBoard;

  const updateGlobalBoard = (newBoard) => {
    globalBoard = newBoard;
    return globalBoard;
  }
  const getGlobalBoard = () => {
    return globalBoard;
  }

  var alwaysInitialBoard;

  const updateInitialBoard = (newBoard) => {
    alwaysInitialBoard = newBoard;
  }
  const getInitialBoard = () => {
    return alwaysInitialBoard;
  }

  var pgnBoardArray;

  const updatePgnBoardArray = (array) => {
    pgnBoardArray = array;
  }

  var moveNum = -1;

  const getNextBoard = () => {
    if (moveNum < pgnBoardArray.length - 1) {
      moveNum++
    }
    updateGlobalBoard(pgnBoardArray[moveNum])
    return pgnBoardArray[moveNum]
  }

  const getPreviousBoard = () => {
    if (moveNum <= -1) {
      moveNum++
    }
    if (moveNum === 0) {
      moveNum--
      updateGlobalBoard(alwaysInitialBoard)
      return alwaysInitialBoard
    }

    if (moveNum > 0) {
      moveNum--
      updateGlobalBoard(pgnBoardArray[moveNum])
      return pgnBoardArray[moveNum]
    }
  }

  return (
    <div class=''>
      {/* <GameList/> */}
      {/* <div class='flex flex-row w-64 h-[512px] border-black border-2'></div> */}
      <div>
      <Visualizer setPos={setPos} currentHoverPosition={currentHoverPosition} getPos={getPos} globalBoard={globalBoard} updateGlobalBoard={updateGlobalBoard} getGlobalBoard={getGlobalBoard} updateInitialBoard={updateInitialBoard} getInitialBoard={getInitialBoard} updatePgnBoardArray={updatePgnBoardArray} getNextBoard={getNextBoard} getPreviousBoard={getPreviousBoard} cookies={cookies.cookies} colorToUpdate={colorToUpdate} updateColor={updateColor} getColor={getColor}/>
      </div>
      {/* <div class='flex flex-row w-64 h-[512px] border-black border-2'></div> */}
    </div>
  )
}

export default BigFunction;