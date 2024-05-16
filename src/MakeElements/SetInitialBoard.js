import {emptyMatrix} from '../HelperFunctions/MakeEmptyMatrix';

const setInitialBoardPosition = matrix => {
  let newBoard = JSON.parse(JSON.stringify(matrix));
  let blackPieces = ['r1', 'n1', 'b1', 'q1', 'k1', 'b2', 'n2', 'r2'];
  let blackPawns = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
  let whitePawns = blackPawns.map(pawn => {
    return pawn.toUpperCase();
  });
  let whitePieces = blackPieces.map(piece => {
    return piece.toUpperCase();
  });

  newBoard[0] = blackPieces;
  newBoard[1] = blackPawns;
  newBoard[6] = whitePawns;
  newBoard[7] = whitePieces;
  return newBoard;
};

export const initialBoard = setInitialBoardPosition(emptyMatrix);
