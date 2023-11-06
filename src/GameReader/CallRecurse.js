import pieceType from "../HelperFunctions/PieceType";
import toMatrixCoords from "../HelperFunctions/ToMatrixCoords";
import moveBRandQ from "./MoveBRandQ";
import handleCastles from "./HandleCastles";
import handleCollisions from "./HandleCollisions";
import {
  movePawnKnightandKing,
  determinePawnVals,
  queeningPawn,
} from "./MovePNandK.js";
import CheckForAbsolutePin from "../ColorCalcFunctions/CheckForAbsolutePin";
import RecurseCallObj from "../StaticVariables/RecurseCallObj";

const callRecurse = (
  pgnItem,
  calcForWhite,
  boardArray,
  initialBoard,
  prevItem
) => {
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

  //either start with the initial position, or the last board rendered
  let board = boardArray[boardArray.length - 1] || initialBoard;
  let slice = JSON.parse(JSON.stringify(board));
  let piece = pieceType(pgnItem[0], calcForWhite);
  let nextBoard;

  let pinnedPieces = CheckForAbsolutePin(board, calcForWhite, RecurseCallObj);
  let pinnedPiecesIndices = pinnedPieces.map((piece) => piece.pinnedPieceIndex);

  // console.log(
  //   "pinnedpieces",
  //   pinnedPieces,
  //   calcForWhite,
  //   pinnedPiecesIndices,
  //   pinnedPieces
  // );

  //these are arbitrary numbers. for user freedom, there are 64 copies of each piece to place on the board. For reading games however, all that matters is the newly created pieces via pawn promotion do not have the same ID number as a piece on the board (i.e. higher than 2)
  let whitePieceCount = 3;
  let blackPieceCount = 3;

  //the second conditional is only to prevent "0-0-0" from being handled by the collision and pawn queening functions
  if (pgnItem.length >= 4 && !pgnItem.includes("-")) {
    coords = toMatrixCoords(coords);
    let middleChar = pgnItem[1];

    //this means a pawn was promoted
    if (pgnItem.includes("=")) {
      let pawnColumn = pgnItem[0];
      //if the length is 5, the pawn captured a piece while promoting, so the coordinates of the pawn to queen are different than if the pawn simply promoted. Thus, the actual destination coordinates are different because of the extra symbol (i.e. ba8=Q vs a8=Q. The coords we need are a8 regardless)
      if (pgnItem.length === 5) {
        coords = `${pgnItem[1]}${pgnItem[2]}`;
      } else {
        coords = `${pgnItem[0]}${pgnItem[1]}`;
      }
      let promotedPiece = pgnItem[pgnItem.indexOf("=") + 1];
      calcForWhite ? whitePieceCount++ : blackPieceCount++;
      coords = toMatrixCoords(coords);
      nextBoard = queeningPawn(
        calcForWhite,
        coords,
        slice,
        calcForWhite ? whitePieceCount : blackPieceCount,
        pawnColumn,
        promotedPiece
      );
    } else {
      nextBoard = handleCollisions(
        board,
        calcForWhite,
        middleChar,
        piece,
        coords,
        isPawnCapture
      );
    }
  } else {
    //if the length is 3, it is either a 'normal' move like 'Nd7' or a pawn capture like 'ef4'
    pgnItem.length === 3 ? (isPawnCapture = true) : (isPawnCapture = false);

    let matrixCoords = toMatrixCoords(coords);
    let type = piece.toUpperCase();

    let isEnPassant =
      pgnItem?.[1] === prevItem?.[0] &&
      prevItem.length === 2 &&
      Math.abs(prevItem?.[1] - pgnItem?.[2]) === 1 &&
      type === pieceType(prevItem, calcForWhite).toUpperCase();

    if (type === "P") {
      let pawnId = pgnItem[0];
      nextBoard = determinePawnVals(
        isPawnCapture,
        calcForWhite,
        matrixCoords,
        slice,
        pawnId,
        isEnPassant
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
        matrixCoords[1],
        null,
        null,
        pinnedPiecesIndices
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
      nextBoard = moveBRandQ(
        matrixCoords,
        calcForWhite,
        piece,
        type,
        slice,
        pinnedPiecesIndices,
        pinnedPieces
      );
    }
    if (pgnItem === "O-O" || pgnItem === "O-O-O") {
      nextBoard = handleCastles(calcForWhite, board, pgnItem);
    }
  }
  return nextBoard;
};

export default callRecurse;
