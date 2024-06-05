export const indexToCoord = index => {
  let remainder = index % 8;
  let multiple = (index - remainder) / 8;
  return [multiple, remainder];
};

export const isInBounds = (rowIndex, columnIndex) => {
  let rowInBounds = rowIndex >= 0 && rowIndex <= 7;
  let columnInBounds = columnIndex >= 0 && columnIndex <= 7;
  if (rowInBounds && columnInBounds) return true;
  return false;
};

export const isWhiteSquare = coords => {
  if ((coords[0] + coords[1]) % 2 === 0) return 'lightSquare';
  return 'darkSquare';
};

export const pieceType = (pieceString, isWhitePiece) => {
  let isPawn =
    pieceString.charCodeAt(0) >= 97 && pieceString.charCodeAt(0) <= 104;
  if (isPawn) pieceString = 'P';
  if (!isWhitePiece) pieceString = pieceString.toLowerCase();
  return pieceString;
};

//-----------------------/
//takes coordination from PGN Notation (e.g. 'e4') and converts to coordinates on the 2d array [5, 5]
//-----------------------/
export const toMatrixCoords = notationCoords => {
  let yIndex = notationCoords.charCodeAt(0) - 97;
  let xIndex = Math.abs(notationCoords[1] - 8);
  return [xIndex, yIndex];
};
