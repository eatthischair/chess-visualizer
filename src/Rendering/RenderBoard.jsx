import isWhiteSquare from "../HelperFunctions/IsWhiteSquare";
import "../App.css";

const RenderBoard = ({
  currentBoard,
  pieceObj,
  colorMatrix,
  setPos,
  boardIsFlipped,
  hexObj,
  currentColor,
  boardElsMatrix,
  updateBoardEls,
  returnBoardEls,
}) => {
  let boardToMap = returnBoardEls() || currentBoard;

  let board = boardToMap.map((currentRow, index) => {
    return currentRow.map((currentCell, cellIndex) => {
      let matrixIndex = [index, cellIndex];
      let keyString = `${index}${cellIndex}`;

      let row = index;
      let column = cellIndex;
      var positionBoardPiece = currentBoard[row][column];
      let colorSum = colorMatrix[row][column];

      if (colorSum > 7) colorSum = 7;
      if (colorSum < -7) colorSum = -7;

      let piece;
      if (positionBoardPiece !== 0) {
        piece = pieceObj[positionBoardPiece];
      }

      let color;
      if (colorSum !== 0) {
        color *= 1;
        if (colorSum > 0) {
          color = `whiteSquare${colorSum}`;
        }
        if (colorSum < 0) {
          colorSum = colorSum * -1;
          color = `blackSquare${colorSum}`;
        }
      } else {
        color = isWhiteSquare(matrixIndex);
        colorSum = 1;
      }

      return (
        <div
          key={keyString}
          id={keyString}
          className={`cell ${color}`}
          onDragOver={() => {
            setPos(matrixIndex);
          }}
        >
          {piece}
        </div>
      );
    });
  });

  updateBoardEls(board);

  if (boardIsFlipped) {
    board = board.map((row) => {
      return row.reverse();
    });
    board = board.reverse();
  }

  return <div className="chessboard">{board}</div>;
};
export default RenderBoard;
