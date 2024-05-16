  //pgn functions
  
  // export const [currentPgn, setCurrentPgn] = useState("");
  // const pgnInput = (e) => {
  //   setCurrentPgn(e.target.value);
  // };

  const readPgn = (index) => {
    //index is only passed via the games in the sidebar. userGames is the array of games to the left of the board
    let pgnToRead = index || index === 0 ? SelectedGames[index] : currentPgn;
    let { boardArray, pgnIsValid } = PgnReader(initialBoard, pgnToRead);
    setCurrentPgn(pgnToRead);
    updatePgnBoardArray(boardArray);
    setPgnValid(pgnIsValid);
    setPlayerNames(GrabTitle(pgnToRead));
    setCurrentBoard(initialBoard);
    resetMoveNum();
  };

  const [pgnValid, setPgnValid] = useState(true);