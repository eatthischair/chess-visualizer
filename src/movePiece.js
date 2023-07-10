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

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let current = boardMatrix[i][j];
      if (current === pieceId) {
        boardMatrix[i][j] = 0;
        pieceIsOnBoard = true;
      }
      if (boardMatrix[i][j][0] === pieceType) {
        pieceTypeCounter++;
      }
    }
  }

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
