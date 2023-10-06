const isWhiteSquare = (coords) => {
  if ((coords[0] + coords[1]) % 2 === 0) return "lightSquare";
  return "darkSquare";
};

export default isWhiteSquare;
