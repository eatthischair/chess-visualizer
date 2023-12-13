import isWhiteSquare from "../HelperFunctions/IsWhiteSquare";
import "../App.css";

const RenderBoard = ({
  currentBoard,
  pieceObj,
  colorMatrix,
  setPos,
  boardIsFlipped,
  color1,
  color2,
  hexObj,
  currentColor,
  boardElsMatrix,
  updateBoardEls,
  returnBoardEls
}) => {
  //the board is rendered as 64 divs not a matrix, so this initializes the array of divs that will be rendered

  // console.log('eee', boardElsMatrix,
  // updateBoardEls,
  // returnBoardEls)

  let boardToMap = returnBoardEls() || currentBoard;
  // console.log('BOARD TO MAP', boardToMap);

  let renderedBoard = boardToMap.map((currentRow, index) => {
    return currentRow.map((currentCell, cellIndex) => {

      let matrixIndex = [index, cellIndex];
      let [y, x] = matrixIndex;
      let keyString = `${y}${x}`;


      let row = matrixIndex[0];
      let column = matrixIndex[1];
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
          // style={{
          //   background: `linear-gradient(${hexObj[color + "1"]}, ${
          //     hexObj[color + "2"]
          //   })`,
          // }}
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
  updateBoardEls(renderedBoard);
  // console.log('rendered board', renderedBoard, returnBoardEls())

  if (boardIsFlipped) renderedBoard = renderedBoard.reverse();
  return <div className="chessboard">{renderedBoard}</div>;
};
export default RenderBoard;
