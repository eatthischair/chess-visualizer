import callRecurse from "./callRecurse";

const PgnReader = (initialBoard, pgn) => {
  let pgnStart;
  let onlyMoves;
  let foundStart = false;
  let commentIndexes = [];
  let dataIndexes = [];
  let insideOfComment = false;
  let insidePgnData = false;
  let commentNestCounter = 0;
  //filter pgndata (contained within []) and comments
  let pgnArray = pgn.split("");

  for (let i = 0; i < pgnArray.length; i++) {
    //this is to find the "1." that always precedes a game, thus the start of the moves in the PGN
    if (pgnArray[i] === "1" && !foundStart && !insidePgnData) {
      if (pgnArray[i + 1] === ".") {
        pgnStart = i;
        onlyMoves = pgnArray.slice(i).join("");
        foundStart = true;
      }
    }
    if (pgnArray[i] === "{") {
      commentIndexes.push(i);
      insideOfComment = true;
    }
    if (pgnArray[i] === "}") {
      commentIndexes.push(i);
      insideOfComment = false;
    }
    if (!insideOfComment) {
      if (pgnArray[i] === "(") {
        commentNestCounter++;
        //only push index of first parentheses
        if (commentNestCounter === 1) {
          commentIndexes.push(i);
        }
      }
      if (pgnArray[i] === ")") {
        commentNestCounter--;
        //only push index of last of nested parentheses
        if (commentNestCounter === 0) {
          commentIndexes.push(i);
        }
      }
    }
    if (pgnArray[i] === "[") {
      dataIndexes.push(i);
      insidePgnData = true;
    }
    if (pgnArray[i] === "]") {
      dataIndexes.push(i);
      insidePgnData = false;
    }
  }
  for (let i = 0; i < dataIndexes.length; i += 2) {
    let slice = pgnArray
      .slice(dataIndexes[i] + 1, dataIndexes[i + 1])
      .join("")
      .split("'");
  }
  commentIndexes.unshift(pgnStart - 1);

  let noComments = [];
  let resultStr = "";

  for (let i = 0; i < commentIndexes.length; i += 2) {
    let slice = pgnArray.slice(commentIndexes[i] + 1, commentIndexes[i + 1]);
    let newslice = slice.join("").split("\n").join(" ");
    noComments.push(newslice);
    slice.join(",");
    resultStr += newslice;
  }

  let newResultStr = resultStr.split(" ");

  let parsedArray = [];
  newResultStr.forEach((item) => {
    let dotIndex = item.indexOf(".");
    if (dotIndex !== -1) {
      let isMoveNum = item[dotIndex + 1] === undefined;
      if (!isMoveNum) {
        item = item.slice(dotIndex + 1);
        if (item !== "..") {
          parsedArray.push(item);
        }
      }
    } else {
      parsedArray.push(item);
    }
  });

  let cleanPgn = [];
  var comments = ["??", "!?", "!!", "?!", "?", "!"];

  parsedArray.forEach((item) => {
    comments.forEach((comment) => {
      if (item.includes(comment)) {
        item = item.split(`${comment}`).join("");
      }
    });
    if (item.indexOf("x") !== -1) {
      item = item.split("x").join("");
    }
    if (item.indexOf("+") !== -1) {
      item = item.split("+").join("");
    }
    if (item.indexOf("#") !== -1) {
      item = item.split("#").join("");
    }
    if (item.length !== 0) {
      cleanPgn.push(item);
    }
  });

  let gamesResults = ["1-0", "1/2-1/2", "0-1", "*"];

  let finalPgn = cleanPgn.slice(0, cleanPgn.length);

  gamesResults.forEach((result) => {
    if (cleanPgn[cleanPgn.length - 1] === result) {
      finalPgn = cleanPgn.slice(0, cleanPgn.length - 1);
    }
  });

  var boardArray = [];
  finalPgn.forEach((item, index) => {
    let calcForWhite = false;
    if (index % 2 === 0) {
      calcForWhite = true;
    }
    let nextBoard = callRecurse(item, calcForWhite, boardArray, initialBoard);
    boardArray.push(nextBoard);
  });

  return boardArray;
};

export default PgnReader;
