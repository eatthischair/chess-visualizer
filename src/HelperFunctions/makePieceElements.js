import ChessIcons from "../ChessIcons";
import onDrop from "../Visualizer";

var makePieceElements = () => {
  var pieceElementsObj = {};
  let pieceArray = ["K", "N", "B", "R", "Q", "P", "k", "n", "b", "r", "q", "p"];
  pieceArray.forEach((piece) => {
    let pieceUrl = ChessIcons()[piece];
    for (var i = 1; i <= 9; i++) {
      let pieceString = `${piece}${i}`;
      pieceElementsObj[pieceString] = (
        <img
          draggable="true"
          alt=""
          src={pieceUrl}
          width="50"
          height="50"
          onDragEnd={(e) => {
            onDrop(e, pieceString);
          }}
        ></img>
      );
    }
  });
  return pieceElementsObj;
};

export default makePieceElements;
