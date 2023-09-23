const setInitialBoardPosition = (emptyMatrix) => {
  var newBoard = JSON.parse(JSON.stringify(emptyMatrix));
  var blackPieces = ["r1", "n1", "b1", "q1", "k1", "b2", "n2", "r2"];
  var blackPawns = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
  var whitePawns = blackPawns.map((pawn) => {
    return pawn.toUpperCase();
  });
  var whitePieces = blackPieces.map((piece) => {
    return piece.toUpperCase();
  });

  newBoard[0] = blackPieces;
  newBoard[1] = blackPawns;
  newBoard[6] = whitePawns;
  newBoard[7] = whitePieces;

  return newBoard;
};

export default setInitialBoardPosition;
