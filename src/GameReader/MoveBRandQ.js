import isInBounds from "../HelperFunctions/IsInBounds";

const moveBRandQ = (
  index,
  calcForWhite,
  piece,
  type,
  slice,
  pinnedPiecesIndices
) => {
  slice = JSON.parse(JSON.stringify(slice));

  console.log("BRAQ", index, pinnedPiecesIndices);
  const recurse = (currentIndex, incrementY, incrementX) => {
    let newY = currentIndex[0] + incrementY;
    let newX = currentIndex[1] + incrementX;
    let inBounds = isInBounds(newY, newX);

    let isPinned;
    if (pinnedPiecesIndices) {
      pinnedPiecesIndices.forEach((coords) => {
        let [pinnedRow, pinnedCol] = coords;
        if (pinnedRow === newY && pinnedCol === newX) {
          isPinned = true;
        }
      });
    }

    if (!inBounds) return;

    let sqHasPiece = slice[newY][newX] !== 0;
    let pieceId = slice[newY][newX];
    let currentSqType = slice[newY][newX][0];
    if (sqHasPiece) {
      if (currentSqType === piece && !isPinned) {
        slice[index[0]][index[1]] = pieceId;
        slice[newY][newX] = 0;
        return;
      } else {
        return;
      }
    } else {
      recurse([newY, newX], incrementY, incrementX);
    }
  };

  var recurseCallObj = {
    B: {
      NE: [
        [1, -1],
        [-1, 1],
      ],
      NW: [
        [1, 1],
        [-1, -1],
      ],
    },
    R: {
      N: [
        [1, 0],
        [-1, 0],
      ],
      W: [
        [0, -1],
        [0, 1],
      ],
    },
  };
  let callObj;
  if (type === "B") {
    callObj = recurseCallObj.B;
  }
  if (type === "R") {
    callObj = recurseCallObj.R;
  }
  if (type === "Q") {
    for (let type in recurseCallObj) {
      for (let direction in recurseCallObj[type]) {
        let arr = recurseCallObj[type][direction];
        arr.forEach((increments) => {
          recurse(index, increments[0], increments[1]);
        });
      }
    }
  } else {
    for (let key in callObj) {
      let arr = callObj[key];
      arr.forEach((increments) => {
        recurse(index, increments[0], increments[1]);
      });
    }
  }
  return slice;
};

export default moveBRandQ;
