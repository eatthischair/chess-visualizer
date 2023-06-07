const calcPriority = (currentBoard) => {
  var pieceNames = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];
  var piecePriority = [
    "A",
    "B",
    "B",
    "C",
    "D",
    "E",
    "a",
    "b",
    "b",
    "c",
    "d",
    "e",
  ];
  var priority = {};
  pieceNames.forEach((el, ind) => {
    priority[el] = piecePriority[ind];
  });

  let priorityBoard = JSON.parse(JSON.stringify(currentBoard));

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      priorityBoard[i][j] = priority[priorityBoard[i][j][0]] || "z";
      priorityBoard[i][j] = priorityBoard[i][j].toLowerCase();
    }
  }
  console.log("ripropirpoir", priorityBoard);
  return priorityBoard;
};

module.exports = calcPriority;
