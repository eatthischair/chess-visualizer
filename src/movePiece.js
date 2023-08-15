const movePiece = (
  squareId,
  pieceId,
  getGlobalBoard,
  updateGlobalBoard,
  setCurrentBoard
) => {
  let boardMatrix = JSON.parse(JSON.stringify(getGlobalBoard()));
  let pieceIsOnBoard = false;
  let pieceType = pieceId[0];
  let pieceTypeCounter = 0;

  //this function finds the index of the piece given by pieceId, changes the board at the index to 0, and updates the board at the new index to the pieceId
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let current = boardMatrix[i][j];
      if (current === pieceId) {
        boardMatrix[i][j] = 0;
        pieceIsOnBoard = true;
      }
      //when iterating, count how many of the moved piece there are, so that up to 64 pieces of the same color & type can be placed
      if (boardMatrix[i][j][0] === pieceType) {
        pieceTypeCounter++;
      }
    }
  }
  //this is to know which pieceId to place on the board, if the piece was dragged from the Add Pieces dropdown.
  if (!pieceIsOnBoard) {
    boardMatrix[squareId[0]][squareId[1]] = `${pieceType}${
      pieceTypeCounter + 1
    }`;
  } else {
    boardMatrix[squareId[0]][squareId[1]] = pieceId;
  }
  updateGlobalBoard(boardMatrix);
  setCurrentBoard(boardMatrix);
};

export default movePiece;
