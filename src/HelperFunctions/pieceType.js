const pieceType = (pieceString, isWhitePiece) => {
  let piece;
  let isPawn =
    pieceString.charCodeAt(0) >= 97 && pieceString.charCodeAt(0) <= 104;

  if (isPawn) {
    piece = "P";
  } else {
    piece = pieceString;
  }
  if (!isWhitePiece) {
    piece = piece.toLowerCase();
  }
  return piece;
};

export default pieceType;
