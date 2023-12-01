const MakePieceElements = (onDrop) => {
  var pieceElementsObj = {};
  let pieceArray = ["K", "N", "B", "R", "Q", "P", "k", "n", "b", "r", "q", "p"];

  let imgColor;

  pieceArray.forEach((piece) => {
    piece === piece.toUpperCase() ? (imgColor = "l") : (imgColor = "d");
    for (var i = 1; i <= 64; i++) {
      let pieceString = `${piece}${i}`;
      pieceElementsObj[pieceString] = (
        <img
          draggable="true"
          alt=""
          src={`../assets/${piece.toLowerCase()}${imgColor}.png`}
          className="piece"
          onDragEnd={(e) => {
            onDrop(e, pieceString);
          }}
        ></img>
      );
    }
  });
  return pieceElementsObj;
};

export default MakePieceElements;
