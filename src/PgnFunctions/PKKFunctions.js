import isInBounds from "../HelperFunctions/isInBounds";

const movePawnKnightandKing = (
  index,
  calcForWhite,
  piece,
  incrementArray,
  slice,
  currentRow,
  currentColumn,
  pawnColumn
) => {
  slice = JSON.parse(JSON.stringify(slice));
  let pawnFound = false;
  let i = 0;

  while (i < incrementArray.length && !pawnFound) {
    let increment = incrementArray[i];
    let row = currentRow + increment[0];
    let column = currentColumn + increment[1];

    if (isInBounds(row, column)) {
      let pieceId = slice[row][column];
      let currentSqPiece = slice[row][column][0];
      if (currentSqPiece === piece) {
        if (pawnColumn) {
          if (column === pawnColumn) {
            slice[row][column] = 0;
            slice[currentRow][currentColumn] = pieceId;
          }
        } else {
          slice[row][column] = 0;
          slice[currentRow][currentColumn] = pieceId;
        }
        pawnFound = true;
      }
    }
    i++;
  }
  return slice;
};

const queeningPawn = (calcForWhite, coords, slice, queenCount) => {
  slice = JSON.parse(JSON.stringify(slice));
  let [row, column] = coords;
  slice[row][column] = calcForWhite
    ? `Q${queenCount - 1}`
    : `q${queenCount - 1}`;
  let pawnToDeleteRow = calcForWhite ? 1 : 7;
  slice[pawnToDeleteRow][column] = 0;
  console.log("queeningpawn", calcForWhite, coords, slice, pawnToDeleteRow);

  return slice;
};

const determinePawnVals = (
  isPawnCapture,
  calcForWhite,
  currentIndex,
  slice,
  pawnId
) => {
  let pawnColumn = pawnId.charCodeAt(0) - 97;
  var pawnVals;
  var whitePawnCaptureVals = [
    [1, -1],
    [1, 1],
  ];
  var blackPawnCaptureVals = [
    [-1, -1],
    [-1, 1],
  ];
  if (calcForWhite) {
    pawnVals = [
      [1, 0],
      [2, 0],
    ];
  } else {
    pawnVals = [
      [-1, 0],
      [-2, 0],
    ];
  }
  if (isPawnCapture) {
    if (calcForWhite) {
      pawnVals = whitePawnCaptureVals;
    } else {
      pawnVals = blackPawnCaptureVals;
    }
  }
  let currentRow = currentIndex[0];
  let currentColumn = currentIndex[1];
  let pieceToSearchFor = calcForWhite ? "P" : "p";
  slice = movePawnKnightandKing(
    currentIndex,
    calcForWhite,
    pieceToSearchFor,
    pawnVals,
    slice,
    currentRow,
    currentColumn,
    pawnColumn
  );
  return slice;
};

export { movePawnKnightandKing, determinePawnVals, queeningPawn };
