import React, { useState, useRef, useEffect } from 'react';
import Visualizer from './Visualizer.jsx';
import PgnReader from './PgnReader.jsx';
import { Link } from "react-router-dom";
import GameList from './GameList';

const BigFunction = (cookies) => {

  console.log('big func cookies', cookies.cookies)

  var currentHoverPosition;
  var globalBoard;
  var alwaysInitialBoard;
  var pgnBoardArray;
  var moveNum = -1;

  const setPos = (id) => {
    currentHoverPosition = id;
    return currentHoverPosition;
  }
  const getPos = () => {
    return currentHoverPosition;
  }
  const updateGlobalBoard = (newBoard) => {
    globalBoard = newBoard;
    return globalBoard;
  }
  const getGlobalBoard = () => {
    return globalBoard;
  }
  const updateInitialBoard = (newBoard) => {
    alwaysInitialBoard = newBoard;
  }
  const getInitialBoard = () => {
    return alwaysInitialBoard;
  }
  const updatePgnBoardArray = (array) => {
    pgnBoardArray = array;
  }
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
      // console.log('movenum', moveNum, pgnBoardArray)
      updateGlobalBoard(pgnBoardArray[moveNum])
      return pgnBoardArray[moveNum]
    }

  }

  return (
    <div class='flex flex-row justify-center align-items-center'>
      {/* <GameList/> */}
      {/* <div class='flex flex-row w-64 h-[512px] border-black border-2'></div> */}
      <div className='visualizer' class='flex place-content-center'>
      <Visualizer setPos={setPos} currentHoverPosition={currentHoverPosition} getPos={getPos} globalBoard={globalBoard} updateGlobalBoard={updateGlobalBoard} getGlobalBoard={getGlobalBoard} updateInitialBoard={updateInitialBoard} getInitialBoard={getInitialBoard} updatePgnBoardArray={updatePgnBoardArray} getNextBoard={getNextBoard} getPreviousBoard={getPreviousBoard} cookies={cookies.cookies}/>
      </div>
      {/* <div class='flex flex-row w-64 h-[512px] border-black border-2'></div> */}
    </div>
  )
}

export default BigFunction;