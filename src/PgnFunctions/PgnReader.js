import callRecurse from "./callRecurse";

const PgnReader = (initialBoard, pgn) => {
  let pgnStart;
  let foundStart = false;
  let commentIndexes = [];
  let dataIndexes = [];
  let insideOfComment = false;
  let insidePgnData = false;
  let commentNestCounter = 0;
  //filter pgndata (contained within []) and comments
  //really wish i learned regex before writing this lmao
  let pgnArray = pgn.split("");

  for (let i = 0; i < pgnArray.length; i++) {
    //this is to find the "1." that always precedes a game, thus the start of the moves in the PGN
    if (pgnArray[i] === "1" && !foundStart && !insidePgnData) {
      if (pgnArray[i + 1] === ".") {
        pgnStart = i;
        pgnArray.slice(i).join("");
        foundStart = true;
      }
    }
    //in PGN format, all comments are nested within {}, so this operation parses out all text inside curly braces.

    if (pgnArray[i] === "{") {
      commentIndexes.push(i);
      insideOfComment = true;
    }
    if (pgnArray[i] === "}") {
      commentIndexes.push(i);
      insideOfComment = false;
    }
    //PGN comments can also be nested using (). this operations records the outermost layer of comments, and later removes all text inside
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
    //this is for the data at the beginning of some PGNs. sometimes a "1." might be included in the date and mess up the start of the pgn, so it is necessary to know where it ends and begins, and delete all text inside
    if (pgnArray[i] === "[") {
      dataIndexes.push(i);
      insidePgnData = true;
    }
    if (pgnArray[i] === "]") {
      dataIndexes.push(i);
      insidePgnData = false;
    }
  }
  //slice all pgn data
  for (let i = 0; i < dataIndexes.length; i += 2) {
    pgnArray
      .slice(dataIndexes[i] + 1, dataIndexes[i + 1])
      .join("")
      .split("'");
  }

  //where the "1." that begins the game starts
  commentIndexes.unshift(pgnStart - 1);

  let noComments = [];
  let resultStr = "";

  //this for loop slices all text that is not inside a comment, to concat into a single string
  for (let i = 0; i < commentIndexes.length; i += 2) {
    let slice = pgnArray.slice(commentIndexes[i] + 1, commentIndexes[i + 1]);
    let newslice = slice.join("").split("\n").join(" ");
    noComments.push(newslice);
    slice.join(",");
    resultStr += newslice;
  }
  let newResultStr = resultStr.split(" ");

  //at this point all superflous PGN data/comments have been parsed. Now we delete all superflous items of the game moves
  let parsedArray = [];
  //this parses out move numbers, turning "2.Nf3" into "Nf3"
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
  let comments = [
    "??",
    "!?",
    "!!",
    "?!",
    "?",
    "!",
    "x",
    "+",
    "#",
    "1-0",
    "1/2-1/2",
    "0-1",
    "*",
  ];

  //parse all superflous symbols
  parsedArray.forEach((item) => {
    comments.forEach((comment) => {
      if (item.includes(comment)) {
        item = item.split(`${comment}`).join("");
      }
    });

    if (item.length !== 0) {
      cleanPgn.push(item);
    }
  });

  //at this point the PGN is clean and it's time to transform it to an array of boards
  var boardArray = [];
  cleanPgn.forEach((item, index) => {
    let calcForWhite = false;
    let prevItem = cleanPgn[index - 1];
    if (index % 2 === 0) calcForWhite = true;
    let nextBoard = callRecurse(
      item,
      calcForWhite,
      boardArray,
      initialBoard,
      prevItem
    );
    boardArray.push(nextBoard);
  });

  let pgnIsValid = true;
  boardArray.forEach((board, index) => {
    if (index > 0) {
      if (
        JSON.stringify(boardArray[index]) ===
          JSON.stringify(boardArray[index - 1]) ||
        boardArray[index] === undefined
      ) {
        pgnIsValid = false;
      }
    }
  });
  if (!boardArray) {
    pgnIsValid = false;
  }
  return { boardArray, pgnIsValid };
};

export default PgnReader;
