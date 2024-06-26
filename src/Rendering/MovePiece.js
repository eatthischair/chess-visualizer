import {getPos} from '../ContextFiles/MousePos.jsx';

const MovePiece = (pieceId, setCurrentBoard, currentBoard) => {
  let squareId = getPos();
  let boardMatrix = JSON.parse(JSON.stringify(currentBoard));
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
    //squareId is a truthy value unless the piece is moved to trash can
    if (squareId) boardMatrix[squareId[0]][squareId[1]] = pieceId;
  }
  setCurrentBoard(boardMatrix);
};

export default MovePiece;
