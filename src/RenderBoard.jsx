import isWhiteSquare from './HelperFunctions/IsWhiteSquare';
import indexToCoord from './HelperFunctions/IndexToCoord';
import './App.css';

const RenderBoard = ({currentBoard, pieceObj, colorMatrix, setPos, boardIsFlipped, color1, color2, hexObj, currentColor}) => {

  //the board is rendered as 64 divs not a matrix, so this initializes the array of divs that will be rendered
  let chessBoard = Array.from('0'.repeat(64))

  var renderedBoard = chessBoard.map((square, currentIndex) => {

    let matrixIndex = indexToCoord(currentIndex);
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
        color = `whiteSquare${colorSum}`

      }
      if (colorSum < 0) {
        colorSum = colorSum * -1;
        color = `blackSquare${colorSum}`
      }
    } else {
      color = isWhiteSquare(matrixIndex);
      colorSum = 1;
    }

    return (<div style={{ background: `linear-gradient(${hexObj[color + '1']}, ${hexObj[color + '2']})`}} id={matrixIndex} className={color}
      onDragOver={()=> {setPos(matrixIndex)}}
      >{piece}</div>
      );
    });
    if (boardIsFlipped) renderedBoard = renderedBoard.reverse();

  return (

      <div className="chessboard">{renderedBoard}</div>
    )
  }
export default RenderBoard;