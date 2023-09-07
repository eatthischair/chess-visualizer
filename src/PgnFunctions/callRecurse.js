import pieceType from "../HelperFunctions/pieceType";
import toMatrixCoords from "../HelperFunctions/toMatrixCoords";
import moveBRandQ from "./moveBRandQ";
import handleCastles from "./handlesCastles";
import handleCollisions from "./handleCollisions";
import {
  movePawnKnightandKing,
  determinePawnVals,
  queeningPawn,
} from "./PKKFunctions";

const callRecurse = (pgnItem, calcForWhite, boardArray, initialBoard) => {
  let coords = pgnItem.slice(pgnItem.length - 2, pgnItem.length);
  let isPawnCapture;
  let kingSqVals = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let knightSqVals = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [-1, -2],
    [1, -2],
  ];

  var board = boardArray[boardArray.length - 1] || initialBoard;
  let slice = JSON.parse(JSON.stringify(board));
  let piece = pieceType(pgnItem[0], calcForWhite);
  let nextBoard;

  //REVISE LATER
  let whiteQueenCount = 1;
  let blackQueenCount = 1;

  if (pgnItem.length === 4) {
    coords = toMatrixCoords(coords);
    let middleChar = pgnItem[1];

    // console.log("rff7", pgnItem, coords, middleChar);

    if (pgnItem.includes("=Q")) {
      console.log("found queen, boss", pgnItem);
      calcForWhite ? whiteQueenCount++ : blackQueenCount++;

      let pawnId = pgnItem.slice(0, 2);
      coords = `${pgnItem[0]}${pgnItem[1]}`;

      console.log("=Q", isPawnCapture, calcForWhite, coords, slice, pawnId);
      coords = toMatrixCoords(coords);

      nextBoard = queeningPawn(
        calcForWhite,
        coords,
        slice,
        calcForWhite ? whiteQueenCount : blackQueenCount
      );
      console.log("queeningpawn NEXTBOARD", nextBoard);

      //axb8 or cxb8, in which case find pawn on c7 or a7
    } else {
      nextBoard = handleCollisions(
        board,
        calcForWhite,
        middleChar,
        piece,
        coords
      );
    }
  } else {
    pgnItem.length === 3 ? (isPawnCapture = true) : (isPawnCapture = false);

    let matrixCoords = toMatrixCoords(coords);
    let type = piece.toUpperCase();

    if (type === "P") {
      let pawnId = pgnItem[0];
      nextBoard = determinePawnVals(
        isPawnCapture,
        calcForWhite,
        matrixCoords,
        slice,
        pawnId
      );
    }
    if (type === "N") {
      nextBoard = movePawnKnightandKing(
        matrixCoords,
        calcForWhite,
        piece,
        knightSqVals,
        slice,
        matrixCoords[0],
        matrixCoords[1]
      );
    }
    if (type === "K") {
      nextBoard = movePawnKnightandKing(
        matrixCoords,
        calcForWhite,
        piece,
        kingSqVals,
        slice,
        matrixCoords[0],
        matrixCoords[1]
      );
    }
    if (type === "Q" || type === "R" || type === "B") {
      nextBoard = moveBRandQ(matrixCoords, calcForWhite, piece, type, slice);
    }
    if (pgnItem === "O-O" || pgnItem === "O-O-O") {
      nextBoard = handleCastles(calcForWhite, board, pgnItem);
    }
  }
  // console.log('nextboard', nextBoard, pgnItem, calcForWhite)
  return nextBoard;
};

export default callRecurse;
