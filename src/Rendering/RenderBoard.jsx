import isWhiteSquare from '../HelperFunctions/IsWhiteSquare';
import '../App.css';
import {useContext, useState, useCallback} from 'react';
import {MyContext} from '../ContextFiles/Context';
import usePreviousColorMatrix from '../CustomHooks/UsePrevColorMatrix';
import {useEffect} from 'react';
import {RenderLogic} from './RenderLogic';
import {initialBoard} from '../MakeElements/SetInitialBoard.js';
const RenderBoard = ({
  currentBoard,
  pieceObj,
  colorMatrix,
  setPos,
  boardIsFlipped,
  boardElsMatrix,
  updateBoardEls,
  returnBoardEls,
}) => {
  // const [runSecondVTrans, setRunSecondVTrans] = useState(false);
  // let changedSquaresIndices = [];
  // const {prevColorMatrix, setPrevColorMatrix} = useContext(MyContext);

  const [colorMatrixStack] = usePreviousColorMatrix(colorMatrix);
  const [board, setBoard] = useState(initialBoard);
  const [initialRender, setInitialRender] = useState(true);

  let boardToMap = returnBoardEls() || currentBoard;
  console.log('colormatrix', colorMatrix, 'colorMatrixStack', colorMatrixStack);
  /*
  plan for tmrw
  store prev color matrix
  so first time function is entered, prevColormatrix is initialized to current board
  every time after that, it compares the current board to prevColormatrix vals. if they are different, then we
  change the className to nullsquare for .2 seconds then do the regular stuff'
  */

  // let board = RenderLogic(
  //   setPos,
  //   boardToMap,
  //   currentBoard,
  //   colorMatrix,
  //   colorMatrixStack,
  //   pieceObj,
  //   true,
  // );

  // // useEffect(() => {
  // //   setBoard(
  // //     RenderLogic(
  // //       setPos,
  // //       boardToMap,
  // //       currentBoard,
  // //       colorMatrix,
  // //       colorMatrixStack,
  // //       pieceObj,
  // //       true,
  // //     ),
  // //   );
  // // }, [initialRe]);
  // // setRunSecondVTrans(true);

  // updateBoardEls(board);
  // // setPrevColorMatrix(colorMatrix);
  // if (boardIsFlipped) {
  //   board = board.map(row => {
  //     return row.reverse();
  //   });
  //   board = board.reverse();
  // }

  useEffect(() => {
    let boardToMap = returnBoardEls() || currentBoard;

    let newBoard = RenderLogic(
      setPos,
      boardToMap,
      currentBoard,
      colorMatrix,
      colorMatrixStack,
      pieceObj,
      false,
    );

    updateBoardEls(newBoard);

    if (boardIsFlipped) {
      newBoard = newBoard.map(row => row.reverse()).reverse();
    }

    setBoard(newBoard);

    const timer = setTimeout(() => {
      let newBoard = RenderLogic(
        setPos,
        boardToMap,
        currentBoard,
        colorMatrix,
        colorMatrixStack,
        pieceObj,
        true,
      );

      updateBoardEls(newBoard);

      if (boardIsFlipped) {
        newBoard = newBoard.map(row => row.reverse()).reverse();
      }

      setBoard(newBoard);
    }, 200); // 0.5 seconds delay

    return () => clearTimeout(timer); // C
  }, [
    currentBoard,
    colorMatrix,
    colorMatrixStack,
    pieceObj,
    setPos,
    boardIsFlipped,
    returnBoardEls,
    updateBoardEls,
  ]);

  return <div className="chessboard">{board}</div>;
};
export default RenderBoard;
