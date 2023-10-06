import React from "react";
import Visualizer from "./Visualizer.jsx";

const BigFunction = (cookies) => {
  var currentHoverPosition;
  var colorToUpdate = "";

  const updateColor = (color) => {
    colorToUpdate = color;
  };
  const getColor = () => {
    return colorToUpdate;
  };

  const setPos = (id) => {
    currentHoverPosition = id;
    return currentHoverPosition;
  };
  const getPos = () => {
    return currentHoverPosition;
  };

  var globalBoard;

  const updateGlobalBoard = (newBoard) => {
    globalBoard = newBoard;
    return globalBoard;
  };
  const getGlobalBoard = () => {
    return globalBoard;
  };

  var alwaysInitialBoard;

  const updateInitialBoard = (newBoard) => {
    alwaysInitialBoard = newBoard;
  };
  const getInitialBoard = () => {
    return alwaysInitialBoard;
  };

  var pgnBoardArray;

  const updatePgnBoardArray = (array) => {
    pgnBoardArray = array;
  };

  var moveNum = -1;
  const resetMoveNum = () => {
    moveNum = -1;
  };

  const getNextBoard = () => {
    if (pgnBoardArray) {
      if (moveNum < pgnBoardArray.length - 1) {
        moveNum++;
      }
      updateGlobalBoard(pgnBoardArray[moveNum]);
      return pgnBoardArray[moveNum];
    } else {
      return alwaysInitialBoard;
    }
  };

  const getPreviousBoard = () => {
    if (pgnBoardArray) {
      if (moveNum <= -1) {
        moveNum++;
      }
      if (moveNum === 0) {
        moveNum--;
        updateGlobalBoard(alwaysInitialBoard);
        return alwaysInitialBoard;
      }
      if (moveNum > 0) {
        moveNum--;
        updateGlobalBoard(pgnBoardArray[moveNum]);
        return pgnBoardArray[moveNum];
      }
    } else {
      return alwaysInitialBoard;
    }
  };
  const getFirstBoard = () => {
    if (pgnBoardArray) {
      moveNum = -1;
    }
    return alwaysInitialBoard;
  };
  const getLastBoard = () => {
    if (pgnBoardArray) {
      moveNum = pgnBoardArray.length - 1;
      return pgnBoardArray[moveNum];
    }
  };

  return (
    <div>
      <div>
        <Visualizer
          setPos={setPos}
          currentHoverPosition={currentHoverPosition}
          getPos={getPos}
          globalBoard={globalBoard}
          updateGlobalBoard={updateGlobalBoard}
          getGlobalBoard={getGlobalBoard}
          updateInitialBoard={updateInitialBoard}
          getInitialBoard={getInitialBoard}
          updatePgnBoardArray={updatePgnBoardArray}
          getNextBoard={getNextBoard}
          getPreviousBoard={getPreviousBoard}
          cookies={cookies.cookies}
          colorToUpdate={colorToUpdate}
          updateColor={updateColor}
          getColor={getColor}
          resetMoveNum={resetMoveNum}
          getFirstBoard={getFirstBoard}
          getLastBoard={getLastBoard}
          moveNum={moveNum}
        />
      </div>
    </div>
  );
};

export default BigFunction;
