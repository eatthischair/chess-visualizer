const makePieceElements = (onDrop) => {
  var pieceElementsObj = {};
  let pieceArray = ["K", "N", "B", "R", "Q", "P", "k", "n", "b", "r", "q", "p"];
  let pieces = require("./ChessIcons");
  pieceArray.forEach((piece) => {
    let pieceUrl = pieces[piece];
    for (var i = 1; i <= 64; i++) {
      let pieceString = `${piece}${i}`;
      pieceElementsObj[pieceString] = (
        <img
          draggable="true"
          alt=""
          src={pieceUrl}
          width="64"
          height="64"
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
