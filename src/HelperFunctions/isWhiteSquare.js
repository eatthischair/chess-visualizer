// const isWhiteSquare = (coords) => {
//   if ((coords[0] + coords[1]) % 2 === 0) {
//     return 'whiteSquare';
//   } else {
//     return 'blackSquare';
//   }
// };
const isWhiteSquare = (coords) => {
  if ((coords[0] + coords[1]) % 2 === 0) {
    return "lightSquare";
  } else {
    return "darkSquare";
  }
};

export default isWhiteSquare;
