import isWhiteSquare from "./HelperFunctions/isWhiteSquare";
import setPos from "./Visualizer";

const RenderInitialBoard = () => {
  let blankBoard = [];
  let positionArray = [];
  for (let i = 0; i < 8; i++) {
    let pieceArray = [];
    for (let j = 0; j < 8; j++) {
      let id = [i, j];
      let color = isWhiteSquare(id);
      blankBoard.push(
        <div
          id={id}
          className={color}
          onDragOver={() => {
            setPos(id);
          }}
        ></div>
      );
      pieceArray.push(0);
    }
    positionArray.push(pieceArray);
  }
  return [blankBoard, positionArray];
};

export default RenderInitialBoard;
