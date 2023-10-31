const pieceType = (pieceString, isWhitePiece) => {
  let isPawn =
    pieceString.charCodeAt(0) >= 97 && pieceString.charCodeAt(0) <= 104;
  if (isPawn) pieceString = "P";
  if (!isWhitePiece) pieceString = pieceString.toLowerCase();
  return pieceString;
};

export default pieceType;
