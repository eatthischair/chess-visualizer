let RecurseCallObj = {
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
  // P: {
  //   NW: pawnVals[0],
  //   NE: pawnVals[1],
  // },
};

export default RecurseCallObj;
